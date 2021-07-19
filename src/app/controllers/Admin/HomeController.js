exports.dashboard = (request, response, next) => {
    response.render('dashboard', { title: "Dashboard" });
}