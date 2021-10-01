document.getElementById('loan-form').addEventListener('submit',function(e){
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';

    setTimeout(calculateResults,2000);

    e.preventDefault();
});

function calculateResults(e) {
    const UIamount = document.querySelector('#amount');
    const UIinterest = document.querySelector('#interest');
    const UIyears = document.querySelector('#years');
    const UImonthlyPayment = document.querySelector('#monthly-payment');
    const UItotalPayment = document.querySelector('#total-payment');
    const UItotalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(UIyears.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        UImonthlyPayment.value = monthly.toFixed(2);
        UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
        UItotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
    }
    else {
        showError('Please check your numbers!');
    }
};
function showError (errorMessage){

    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'none';

    const errDiv = document.createElement('div');

    const UIcard = document.querySelector('.card');
    const UIheading = document.querySelector('.heading');

    errDiv.className = 'alert alert-danger';
    errDiv.appendChild(document.createTextNode(errorMessage));

    UIcard.insertBefore(errDiv, UIheading);

    setTimeout(clearError, 3000);
};
function clearError () {
    document.querySelector('.alert').remove();
}
