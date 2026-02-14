$(document).ready(function () {

    // Datepicker
    $("#date").datepicker({
        dateFormat: "dd.mm.yy"
    });

    // Inicjalizacja DataTables
    var table = $("#notesTable").DataTable({
        language: {
            search: "Szukaj:",
            lengthMenu: "Pokaż _MENU_ wpisów",
            info: "Strona _PAGE_ z _PAGES_",
            paginate: {
                previous: "Poprzednia",
                next: "Następna"
            }
        }
    });

    // Licznik znaków
    $("#content").on("keyup", function () {
        $("#charCount").text("Liczba znaków: " + $(this).val().length);
    });

    // Tryb ciemny
    $("#darkModeBtn").click(function () {
        $("body").toggleClass("dark");
    });

    // WALIDACJA
    $("#noteForm").validate({
        rules: {
            title: {
                required: true,
                minlength: 3
            },
            content: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            title: "Minimum 3 znaki",
            content: "Minimum 5 znaków"
        },

        submitHandler: function (form) {

            var title = $("#title").val();
            var content = $("#content").val();
            var date = $("#date").val();

            // Dodanie do DataTables (TO MUSI BYĆ TAK)
            table.row.add([
                title,
                content,
                date,
                "<button class='btn btn-danger deleteBtn'>Usuń</button>"
            ]).draw(true);

            // Efekt animacji
            $("#notesTable").hide().fadeIn(400);

            form.reset();
            $("#charCount").text("");

            return false;
        }
    });

    // Usuwanie (delegacja zdarzeń)
    $("#notesTable tbody").on("click", ".deleteBtn", function () {
        table.row($(this).closest("tr")).remove().draw();

        $("#notesTable").slideUp(200).slideDown(200);
    });

    // Hover efekt
    $("#notesTable tbody").on("mouseenter", "tr", function () {
        $(this).addClass("note-hover");
    });

    $("#notesTable tbody").on("mouseleave", "tr", function () {
        $(this).removeClass("note-hover");
    });

});
