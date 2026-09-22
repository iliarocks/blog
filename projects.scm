(define (prepare-project directory)
  (append (read-json-file (string-append directory "/metadata.json"))
          (list (cons "directory" directory))))

(define (prepare-projects)
  (map (lambda (name)
         (prepare-project (string-append "projects/" name)))
       (directory-file-names "projects")))

(define (render-project project)
  `(article (@ (lang ,(field project "lang")))
     (h2 ,(field project "title"))
     (p ,(field project "description"))
     (address (@ (lang "en"))
              (a (@ (href ,(field project "website"))) "Website")
              (a (@ (href ,(field project "source"))) "Source"))
     (figure
       (img (@ (src ,(string-append "/" (field project "directory") "/screenshot.png"))
               (alt ,(field project "alt"))
               (loading "lazy"))))))

(define (render-projects-index projects)
  (render-page "Projects" "en"
    `(body
       ,header
       (main (@ (class "projects-index"))
             ,@(map render-project projects)))))
