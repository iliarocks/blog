(define navigation
  '(nav
     (a (@ (href "/photos/index.html")) "Photos")
     (a (@ (href "/writing/index.html")) "Writing")
     (a (@ (href "/projects/index.html")) "Projects")))

(define header
  `(header (@ (lang "en"))
     (a (@ (href "/index.html")) "Ilia Parunashvili")
     ,navigation))

(define (render-page title language body)
  `(html (@ (lang ,language))
         (head
           (meta (@ (charset "utf-8")))
           (meta (@ (name "viewport")
                    (content "width=device-width, initial-scale=1")))
           (title ,title)
           (link (@ (rel "stylesheet") (href "/style.css")))
           (script (@ (src "/video.js") (defer))))
         ,body))

(define (render-date date)
  `(time (@ (datetime ,date) (lang "en"))
         ,(month/long-string (string->number (substring date 5 7)))
         " "
         ,(substring date 0 4)))
