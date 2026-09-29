(define header
  '(header (@ (lang "en"))
     (a (@ (href "/index.html")) "Ilia Parunashvili")
     (nav
       (a (@ (href "/photos/index.html")) "Photos")
       (a (@ (href "/writing/index.html")) "Writing"))))

(define (render-page title language content)
  `(html (@ (lang ,language))
         (head
           (meta (@ (charset "utf-8")))
           (meta (@ (name "viewport")
                    (content "width=device-width, initial-scale=1")))
           (title ,title)
           (link (@ (rel "stylesheet") (href "/style.css")))
           (script (@ (src "/video.js") (defer))))
         (body
           ,header
           ,content)))

(define (render-date date)
  `(time (@ (datetime ,date) (lang "en"))
         ,(month/long-string (string->number (substring date 5 7)))
         " "
         ,(substring date 0 4)))
