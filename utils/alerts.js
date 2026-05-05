export function showAlert(message, type = "success") {
    const alert = $(`
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `);

    $("#alert_container").append(alert);

    setTimeout(() => {
        alert.alert("dispose");
        alert.remove();
    }, 3000);
}