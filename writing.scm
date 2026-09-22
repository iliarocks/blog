(define (prepare-essay directory)
  (append (read-json-file (string-append directory "/metadata.json"))
          (list (cons "directory" directory)
                (cons "html" (command-output "cmark"
                               (list "--unsafe" (string-append directory "/essay.md")))))))

(define (prepare-essays)
  (sort (map (lambda (name)
               (prepare-essay (string-append "writing/" name)))
             (directory-file-names "writing"))
        (lambda (a b) (string>? (field a "date") (field b "date")))))

(define (render-essay essay)
  (define title (field essay "title"))
  (define date (field essay "date"))
  (render-page title (field essay "lang")
    `(body
       ,header
       (main
         (article (@ (class "essay"))
                  (header
                    (h1 ,title)
                    ,(render-date date))
                  (div (@ (class "prose")) (raw ,(field essay "html"))))))))

(define (render-essay-preview essay)
  (define date (field essay "date"))
  `(li
     (a (@ (href ,(string-append "/" (field essay "directory") ".html"))
           (lang ,(field essay "lang")))
        ,(field essay "title"))
     ,(render-date date)))

(define (render-writing-index essays)
  (render-page "Writing" "en"
    `(body
       ,header
       (main (@ (class "writing-index"))
             (ul ,@(map render-essay-preview essays))))))
