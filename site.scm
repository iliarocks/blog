(define output-path "public/index.html")

(define home
  (string-append
    "<!doctype html>\n"
    "<html lang=\"en\">\n"
    "  <head>\n"
    "    <meta charset=\"utf-8\">\n"
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n"
    "    <title>Ilia</title>\n"
    "  </head>\n"
    "  <body>\n"
    "    <main>\n"
    "      <h1>Ilia</h1>\n"
    "      <p>A home for things I make with passion</p>\n"
    "    </main>\n"
    "  </body>\n"
    "</html>\n"))

(define (build!)
  (unless (file-directory? "public")
    (make-directory "public"))

  (call-with-output-file
    output-path
    (lambda (port)
      (display home port)))

  output-path)

(build!)
