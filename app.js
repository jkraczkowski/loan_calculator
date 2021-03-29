//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //Hide results
    document.getElementById('results').style.display = 'none';

    //Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults,2000);

    e.preventDefault();
});

//Calculate results
function calculateResults(){
    //UI
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly_payment');
    const totalPayment = document.getElementById('total_payment');
    const totalInterest = document.getElementById('total_interest');

    //Caclulations
    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100 /12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value =  (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principle).toFixed(2);

        //Show results
        document.getElementById('results').style.display = 'block';

        //Hide loader
        document.getElementById('loading').style.display = 'none';

    }else {
        showError('Please check your numbers');
        document.getElementById('loading').style.display = 'none';
    }
}

//Show error
function showError(error){
    //Create a div for error
    const errorDiv = document.createElement('div');

    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class
    errorDiv.className = 'alert alert-danger';

    //Text append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error div above heading
    card.insertBefore(errorDiv, heading);

    //Clear error
    setTimeout(clearError, 3000);
}

//Clear error function
function clearError(){
    document.querySelector('.alert').remove();
}
