(define (media-field fields key)
  (let ((entry (assoc key fields)))
    (and entry (cdr entry))))

(define (read-metadata filename)
  (define tags
    (car (read-json
           (open-input-string
             (command-output "exiftool"
               (list "-json" "-n" "-ImageWidth" "-ImageHeight"
                     "-Orientation" "-Rotation"
                     filename))))))
  (define video? (string=? (pathname-type filename) "mov"))
  (define width (field tags "ImageWidth"))
  (define height (field tags "ImageHeight"))
  (define rotation (or (media-field tags "Rotation") 0))
  (define swap? (or (memv (media-field tags "Orientation") '(5 6 7 8))
                    (not (zero? (modulo rotation 180)))))
  (append
    (list (cons "type" (if video? "video" "image"))
          (cons "width" (if swap? height width))
          (cons "height" (if swap? width height)))
    (if video?
        (list (cons "poster" (->namestring (pathname-new-type filename "jpeg"))))
        '())))

(define (process-image! input destination)
  (define output (string-append destination "/" (file-namestring input)))
  (run-command "ffmpeg"
    (list "-hide_banner" "-loglevel" "error" "-y" "-i" input
          "-frames:v" "1" "-vf" "scale='min(1280,iw)':-1:flags=lanczos"
          "-q:v" "3" "-map_metadata" "-1" "-update" "1" output)))

(define (process-video! input destination)
  (define video (string-append destination "/" (file-namestring input)))
  (define poster (->namestring (pathname-new-type video "jpeg")))
  (run-command "ffmpeg"
    (list "-hide_banner" "-loglevel" "error" "-y" "-i" input
          "-map" "0:v:0" "-map" "0:a:u:?"
          "-vf" "scale=out_color_matrix=bt709:out_primaries=bt709:out_transfer=bt709:intent=perceptual"
          "-pix_fmt" "yuv420p"
          "-c:v" "libx264" "-crf" "20" "-c:a" "aac" "-b:a" "192k"
          "-map_metadata" "-1" "-map_metadata:s" "-1" "-map_chapters" "-1"
          "-movflags" "+faststart" video))
  (run-command "ffmpeg"
    (list "-hide_banner" "-loglevel" "error" "-y" "-i" video
          "-map" "0:v:0" "-frames:v" "1" "-vf"
          "colorspace=space=smpte170m:primaries=bt709:trc=srgb:range=pc,scale='min(1280,iw)':-2"
          "-q:v" "2" "-map_metadata" "-1" "-update" "1" poster)))

(define (process-assets! directory)
  (define destination (string-append "public/" directory))
  (for-each
    (lambda (filename)
      (define input (string-append directory "/" filename))
      (cond
        ((string=? (pathname-type filename) "jpeg")
         (process-image! input destination))
        ((string=? (pathname-type filename) "mov")
         (process-video! input destination))))
    (directory-file-names directory)))
