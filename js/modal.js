const validateFields = (form, fieldsArr) => {
  //  [name, phone, comment, to]
    fieldsArr.forEach( field => {

        field.removeClass('input-error');

        if (field.val().trim() === "") {
          field.addClass('input-error');
        }
    });

    const errorFields = form.find(".input-error");
    return errorFields.length === 0;
}

$(".delivery__form").submit( e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $("#modalId");
    const content = modal.find(".modal__content");

    const isValid = validateFields(form,[name, phone, comment, to]);
    modal.removeClass('error-modal');


    if (isValid) {
        const request = $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val()
            },
           
           
        });

        request.done(data => {
            console.log(data);
                content.text(data.message);
               
        });

        request.fail(data => {
            console.log(data);
            const message = data.responseJSON.message;
            content.text(message);
            modal.addClass('error-modal');
           
        });

        request.always(() => {
            
            $.fancybox.open({
                src: "#modalId",
                type: "inline"
            });
        } );
    }

   
});

$(".app-close-modal").click( e => {
    e.preventDefault();

    $.fancybox.close();
})