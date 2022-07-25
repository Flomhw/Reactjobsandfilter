# React-joblisting-filter
##A simple React app to list elements and filter them with taxonomy.
## See demo here : https://flomhw.github.io/React-joblisting-filter/

You can tweak this in order to adapt it to many type of taxonomy related elements.
To do so, you can edit the doFilter() function by changing the array you want to filter throught :

[item.role, item.level, ...item.languages, ...item.tools].includes(filter) => [anyArray].includes(filter)
