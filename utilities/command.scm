(define (command-output program arguments)
  (let* ((output (open-output-string))
         (status (run-synchronous-subprocess program arguments
                   'input #f 'output output)))
    (unless (zero? status)
      (error "Command failed" program (get-output-string output)))
    (get-output-string output)))
