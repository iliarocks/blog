(load-option 'synchronous-subprocess)
(load "utilities/json.scm")
(load "utilities/html.scm")
(load "utilities/command.scm")
(load "utilities/media.scm")
(load "components.scm")
(load "home.scm")
(load "photos.scm")
(load "writing.scm")

(define (build!)
  (run-command "find" '("." "-name" ".DS_Store" "-delete"))
  (run-command "rm" '("-rf" "public"))
  (make-directory "public")

  (for-each
    (lambda (section)
      (make-directory (string-append "public/" section))
      (for-each
        (lambda (name)
          (define directory (string-append section "/" name))
          (make-directory (string-append "public/" directory))
          (process-assets! directory))
        (directory-file-names section)))
    '("photos" "writing"))
  (copy-file "style.css" "public/style.css")
  (copy-file "video.js" "public/video.js")

  (define galleries (prepare-galleries))
  (define essays (prepare-essays))

  (write-html "public/index.html" (render-home))
  (write-html "public/photos/index.html" (render-photos-index galleries))
  (write-html "public/writing/index.html" (render-writing-index essays))
  (for-each
    (lambda (gallery)
      (write-html
        (string-append "public/" (field gallery "directory") ".html")
        (render-gallery gallery)))
    galleries)
  (for-each
    (lambda (essay)
      (write-html
        (string-append "public/" (field essay "directory") ".html")
        (render-essay essay)))
    essays))

(build!)
