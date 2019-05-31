SELECT a.department_id AS 'Department ID', 
a.department_name AS 'Department Name', 
a.over_head_costs AS 'Overhead Costs', 
SUM(b.product_sales) AS 'Total Sales',
(SUM(b.product_sales) - a.over_head_costs) AS 'Total Profit'
FROM departments AS a
INNER JOIN products AS b ON a.department_name = b.department_name
GROUP BY a.department_name
ORDER BY a.department_name;