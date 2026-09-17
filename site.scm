(define output-path "public/index.html")

(define (build!)
  (unless (file-directory? "public")
    (make-directory "public"))

  (copy-file "index.html" output-path)
  (copy-file "style.css" "public/style.css")
  (copy-file "avatar.jpg" "public/avatar.jpg")

  output-path)

(build!)
