// Function to display employee details in modal
function displayEmployeeDetails(employee,event) {

  // var modal = document.getElementById("myModal");
  // modal.style.display = "block";
  // modal.style.opacity = 0;

  // var clickX = event.clientX;
  // var clickY = event.clientY + 5250;
  
  // modal.style.transform = `translate(-13350px, -${clickY}px) scale(0.1)`;
  
  // setTimeout(function(clickY) {
  //   modal.style.opacity = 1;
  //   modal.style.transform = "translate(-7350px, -"+clickY+"px) scale(1)";
  // }, 50);


  const modalContent = document.getElementById('modal-content');
  if(employee.image === ""){
    employee.image = "userphoto.jpg"
  }
  modalContent.innerHTML = `
      <img src="../images/${employee.image}" alt="Employee Image">
      <h2>${employee.name}</h2>
      <p><i>${employee.role}</i></p>
      <section>
      <p><strong>Department:</strong> ${employee.department}</p>
      <p><strong>Reports to:</strong> ${employee.reports_to}</p>
      </section>
      <section>
      <p><strong>Email:</strong> ${employee.email}</p>
      </section>
  `;
  document.getElementById('myModal').style.display = "block";
}

// Function to close the modal
function closeModal() {
  document.getElementById('myModal').style.display = "none";
}

// Function to fetch and display employees
function displayEmployees(employees) {
  // const randomNumberCeil = Math.ceil(Math.random() * 3);
  // const duration = parseInt( randomNumberCeil + "000" );
  const employeeList = document.getElementById('employees');
  // employeeList.innerHTML = "";

  // const loader = document.createElement('div');
  // loader.className = 'lds-spinner';
  // loader.innerHTML = `
  // <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
  // `
  // employeeList.appendChild(loader);
  setTimeout(function() {
  
  employeeList.innerHTML = ''; // Clear previous results
  if(employees.length == 0){
    const noResult = document.createElement('li');
    noResult.className = 'no-result';
    noResult.innerHTML = "No Results";
    employeeList.appendChild(noResult);
  }else{
    employees.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
  }
  employees.forEach(employee => {
      const employeeItem = document.createElement('li');
      employeeItem.className = 'employee';
      employeeItem.addEventListener('click', (e) => displayEmployeeDetails(employee,e));
      
      const image = document.createElement('img');
      if(employee.image === ""){
        employee.image = "userphoto.jpg"
      }
      image.src = "../images/"+employee.image;
      image.alt = 'Employee Image';
      
      const infName = document.createElement('h3');
      infName.className = 'name';
      infName.innerHTML = employee.name;
      const infRole = document.createElement('p');
      infRole.className = 'role';
      infRole.innerHTML = employee.role;
      const infDepartment = document.createElement('p');
      infDepartment.className = 'department';
      infDepartment.innerHTML = employee.department;
      const infReportsTo = document.createElement('p');
      infReportsTo.className = 'reporting-to';
      infReportsTo.innerHTML = employee.reports_to;
      
      employeeItem.appendChild(image);
      employeeItem.appendChild(infName);
      employeeItem.appendChild(infRole);
      employeeItem.appendChild(infDepartment);
      employeeItem.appendChild(infReportsTo);
      
      employeeList.appendChild(employeeItem);
  });
  },1);
}

// Function to filter employees based on department
function filterEmployees() {
  const departmentFilter = document.getElementById('departmentFilter').value;
  const filteredEmployees = window.data.employees.filter(employee => {
      return departmentFilter === 'all' || employee.department.toLowerCase() === departmentFilter;
  });
  displayEmployees(filteredEmployees);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to search employees based on name
function searchEmployees() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const departmentFilter = document.getElementById('departmentFilter').value;
  let filteredEmployees = window.data.employees;

  if (departmentFilter !== 'all') {
      filteredEmployees = filteredEmployees.filter(employee => employee.department.toLowerCase() === departmentFilter);
  }

  filteredEmployees = filteredEmployees.filter(employee => employee.name.toLowerCase().includes(searchInput));
  displayEmployees(filteredEmployees);
}

// Fetch JSON data
fetch('../Data/employees.json')
  .then(response => response.json())
  .then(data => {
      // Save the JSON data globally for use in other functions
      window.data = data;
      displayEmployees(data.employees);
  })
  .catch(error => console.error('Error fetching data:', error));
