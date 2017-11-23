CREATE TABLE todo (
	id SERIAL PRIMARY KEY,  
	due 	DATE,
	task VARCHAR(80) NOT NULL,
	steps VARCHAR(1000),
	completed VARCHAR(1)
);

INSERT INTO todo (due, task, steps, completed)
VALUES ('1-1-1' , 'Make One', 
'Make your own task.  Give it a due date and a list of steps to complete!', 'N')