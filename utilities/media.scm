(define (media-field fields key)
  (let ((entry (assoc key fields)))
    (and entry (cdr entry))))

(define (media-date value)
  (let ((date (string-copy value)))
    (when (char=? (string-ref date 4) #\:)
      (string-set! date 4 #\-)
      (string-set! date 7 #\-)
      (string-set! date 10 #\T))
    date))

(define (read-metadata filename)
  (define tags
    (car (read-json
           (open-input-string
             (command-output "exiftool"
               (list "-json" "-n" "-MIMEType" "-ImageWidth" "-ImageHeight"
                     "-Orientation" "-Rotation" "-SubSecDateTimeOriginal"
                     "-DateTimeOriginal" "-CreationDate"
                     filename))))))
  (define video? (equal? (media-field tags "MIMEType") "video/mp4"))
  (define width (media-field tags "ImageWidth"))
  (define height (media-field tags "ImageHeight"))
  (define rotation (or (media-field tags "Rotation") 0))
  (define swap? (or (memv (media-field tags "Orientation") '(5 6 7 8))
                    (not (zero? (modulo rotation 180)))))
  (define date
    (or (and video? (media-field tags "CreationDate"))
        (media-field tags "SubSecDateTimeOriginal")
        (media-field tags "DateTimeOriginal")
        (media-field tags "CreationDate")))
  (append
    (list (cons "type" (if video? "video" "image"))
          (cons "width" (if swap? height width))
          (cons "height" (if swap? width height))
          (cons "capturedAt" (media-date date)))
    (if video?
        (list (cons "poster" (file-namestring (pathname-new-type filename "jpg"))))
        '())))

(define (publish-assets! directory)
  (for-each
    (lambda (path)
      (define input (string-append directory "/" (file-namestring path)))
      (define output (string-append "public/" input))
      (define type (string-downcase (or (pathname-type path) "")))
      (cond
        ((member type '("jpg" "jpeg" "png"))
         (run-synchronous-subprocess "ffmpeg"
           (list "-hide_banner" "-loglevel" "error" "-y" "-i" input
                 "-frames:v" "1" "-vf" "scale='min(1280,iw)':-1:flags=lanczos"
                 "-q:v" "3" "-map_metadata" "-1" "-update" "1" output))
         (run-synchronous-subprocess "exiftool"
           (list "-overwrite_original" "-all=" "-tagsFromFile" input
                 "-ICC_Profile" output)))
        ((equal? type "mp4")
         (run-synchronous-subprocess "ffmpeg"
           (list "-hide_banner" "-loglevel" "error" "-y" "-i" input
                 "-map" "0:v:0" "-map" "0:a?"
                 "-c:v" "libx264" "-crf" "20" "-c:a" "copy"
                 "-map_metadata" "-1" "-map_metadata:s" "-1" "-map_chapters" "-1"
                 "-movflags" "+faststart" output))
         (run-synchronous-subprocess "ffmpeg"
           (list "-hide_banner" "-loglevel" "error" "-y" "-i" output
                 "-map" "0:v:0" "-frames:v" "1" "-vf"
                 "colorspace=space=smpte170m:primaries=bt709:trc=srgb:range=pc,scale='min(1280,iw)':-2"
                 "-q:v" "2" "-map_metadata" "-1" "-update" "1"
                 (->namestring (pathname-new-type output "jpg")))))))
    (directory-read (string-append directory "/*"))))
