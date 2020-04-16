INSERT INTO department (department_name)
VALUES ("Sales"), ("Finance"), ("Developer"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Rep", 75000, 2), ("Accountant", 80000, 1), ("Full Stack Developer", 100000, 3), ("Attorney",  120000, 2), ("Office Admin", 47000,3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Leslie", "Perez", 1, null), ("Cindy", "Smith", 2, 234), ("Paul", "Miller", 3, 345), ("Judy", "Sanchez", 4, null);