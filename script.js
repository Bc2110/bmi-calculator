
var age = document.getElementById("age");
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
var form = document.getElementById("form");

var formSubmitted = false;

function validateForm() {
  if (formSubmitted) {
    alert("Form already submitted!");
    return false;
  }

  if (age.value == '' || height.value == '' || weight.value == '' || (male.checked == false && female.checked == false)) {
    alert("All fields are required!");
    return false;
  }

  return true;
}

function countBmi() {
  var p = [age.value, height.value, weight.value];
  if (male.checked) {
    p.push("male");
  } else if (female.checked) {
    p.push("female");
  }
  form.reset();
  var bmi = Number(p[2]) / (Number(p[1]) / 100 * Number(p[1]) / 100);

  var result = '';
  if (bmi < 18.5) {
    result = 'Underweight';
  } else if (18.5 <= bmi && bmi <= 24.9) {
    result = 'Healthy';
  } else if (25 <= bmi && bmi <= 29.9) {
    result = 'Overweight';
  } else if (30 <= bmi && bmi <= 34.9) {
    result = 'Obese';
  } else if (35 <= bmi) {
    result = 'Extremely obese';
  }

    displayPieChart(result);
displayResult(result, bmi);

  formSubmitted = true;
}

function displayResult(category, bmiValue) {
  var h1 = document.createElement("h1");
  var h2 = document.createElement("h2");
  var note = document.createElement("p");

  var categoryText = document.createTextNode(category);
  var bmiLabelText = document.createTextNode('BMI: ');
  var bmiValueText = document.createTextNode(parseFloat(bmiValue).toFixed(2));

  h1.appendChild(categoryText);
  h2.appendChild(bmiLabelText);
  h2.appendChild(bmiValueText);

  document.body.appendChild(h1);
  document.body.appendChild(h2);

  // Additional note content
  note.innerHTML = '<b>Note:</b> BMI is not a perfect measure of body fat and can be affected by muscle mass, bone density, and distribution of fat in the body. It is not generally used for children or adolescents because their bodies are still growing and their BMI can change during this time, so it should be used as a general guide and not a diagnostic tool.';
  note.style.textAlign = 'center';
  note.style.color = '#6b6e70';
  note.style.marginLeft = '70px';
  note.style.marginRight = '70px';
  note.style.fontSize = 'large';
  h2.style.textAlign = 'center';
  h1.style.fontSize = 'xx-large';
  h2.style.fontSize = 'xx-large';
  document.body.appendChild(note);
}


function displayPieChart(category) {
  var canvas = document.createElement("canvas");
  canvas.id = "bmiChart";
  canvas.width = 250;
  canvas.height = 250;
  canvas.style.margin = "auto";


  document.body.appendChild(canvas);

  var ctx = canvas.getContext("2d");

  var data = {
    labels: ["Underweight", "Healthy", "Overweight", "Obese", "Extremely obese"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#c0392b"],
      },
    ],
  };

  switch (category) {
    case "Underweight":
      data.datasets[0].data[0] = 1;
      break;
    case "Healthy":
      data.datasets[0].data[1] = 1;
      break;
    case "Overweight":
      data.datasets[0].data[2] = 1;
      break;
    case "Obese":
      data.datasets[0].data[3] = 1;
      break;
    case "Extremely obese":
      data.datasets[0].data[4] = 1;
      break;
  }

  var bmiChart = new Chart(ctx, {
    type: "pie",
    data: data,
  });
  
}


document.getElementById("submit").addEventListener("click", function () {
  if (validateForm()) {
    countBmi();
  }
});