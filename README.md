# node-get-post-example

Not sure if this is an error with the API or not, but multiplication and addition
operations have a high chance of returning an unsafe number. It's possible to modify the 
result prior to a POST and get back a 200 instead of a 400.

To help debug the issue, I've added a log for each unsafe result number. When reproducing
the issue by adding say 50, or 500, to the result prior to POST, subtraction / remainder / division 
will correctly return 400 on the modified result. When addition / multiplication produce safe numbers, 
this will also return a 400 correctly. 

However, when addition and multiplication return unsafe numbers, and more is added to the result,
we will get a 200 under these circumstances when it should be a 400.