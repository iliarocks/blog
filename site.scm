(load-option 'synchronous-subprocess)
(load "utilities/json.scm")
(load "utilities/html.scm")
(load "utilities/command.scm")
(load "utilities/media.scm")
(load "components.scm")
(load "home.scm")
(load "photos.scm")
(load "writing.scm")
(load "projects.scm")

(define (build!)
  (run-synchronous-subprocess "rm" '("-rf" "public"))
  (make-directory "public")

  (for-each
    (lambda (section)
      (make-directory (string-append "public/" section))
      (for-each
        (lambda (name)
          (define directory (string-append section "/" name))
          (make-directory (string-append "public/" directory))
          (publish-assets! directory))
        (directory-file-names section)))
    '("projects" "photos" "writing"))
  (copy-file "style.css" "public/style.css")
  (copy-file "video.js" "public/video.js")
  (copy-file "avatar.jpg" "public/avatar.jpg")

  (define projects (prepare-projects))
  (define galleries (prepare-galleries))
  (define essays (prepare-essays))

  (write-html "public/index.html" (render-home))
  (write-html "public/projects/index.html" (render-projects-index projects))
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
