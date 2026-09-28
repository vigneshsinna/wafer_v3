(function (window, $) {
    'use strict';

    var AIZ = window.AIZ = window.AIZ || {};
    AIZ.data = {
        csrf: $('meta[name="csrf-token"]').attr('content'),
        appUrl: $('meta[name="app-url"]').attr('content') || window.location.origin,
        fileBaseUrl: $('meta[name="file-base-url"]').attr('content') || window.location.origin
    };

    function notify(type, message) {
        var level = type === 'danger' || type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info';
        var alert = $('<div class="aiz-notify alert alert-' + level + '" role="status"></div>').text(message);
        $('body').append(alert);
        window.setTimeout(function () { alert.remove(); }, 4000);
    }

    AIZ.plugins = Object.assign(AIZ.plugins || {}, {
        notify: notify,
        chart: function (selector, options) {
            var node = document.querySelector(selector);
            if (node && window.Chart) return new window.Chart(node.getContext('2d'), options);
        },
        bootstrapSelect: function (method) {
            if ($.fn.selectpicker) $('.aiz-selectpicker').selectpicker(method || undefined);
        },
        fooTable: function () {},
        sectionFooTable: function () {},
        slickCarousel: function () {},
        tagify: function () {},
        dateRange: function () {}
    });

    $.notify = function (payload, options) {
        notify(options && options.type, payload && payload.message ? payload.message : String(payload || ''));
    };

    $(function () {
        AIZ.plugins.bootstrapSelect();
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="aizuploader"]').each(function () {
            var group = $(this);
            var selected = group.find('.selected-files');
            var preview = group.nextAll('.file-preview').first();
            var chooser = $('<input type="file" class="sr-only" aria-label="Choose image">').appendTo(group);
            if (group.attr('data-type') === 'image') chooser.attr('accept', 'image/png,image/jpeg,image/webp,image/gif,image/svg+xml');
            if (group.attr('data-multiple') === 'true') chooser.prop('multiple', true);
            group.css('cursor', 'pointer').on('click', function (event) {
                if ($(event.target).is('input')) return;
                chooser.trigger('click');
            });
            chooser.on('change', async function () {
                var ids = group.attr('data-multiple') === 'true' && selected.val() ? String(selected.val()).split(',') : [];
                for (var file of Array.from(this.files)) {
                    if (file.size > 10 * 1024 * 1024) { notify('danger', 'Files must be smaller than 10 MB.'); continue; }
                    var form = new FormData();
                    form.append('aiz_file', file);
                    try {
                        var upload = await $.ajax({
                            url: '/aiz-uploader/upload', method: 'POST', data: form,
                            processData: false, contentType: false,
                            headers: { 'X-CSRF-TOKEN': AIZ.data.csrf }
                        });
                        ids.push(String(upload.id));
                        selected.val(ids.join(','));
                        group.find('.file-amount').text(file.name);
                        if (preview.length && upload.url && file.type.startsWith('image/')) {
                            if (group.attr('data-multiple') !== 'true') preview.empty();
                            preview.append($('<img alt="Selected image" class="aiz-upload-preview">').attr('src', upload.url));
                        }
                    } catch (error) { notify('danger', 'File upload failed.'); }
                }
                chooser.val('');
            });
        });
        $('[data-toggle="aiz-mobile-nav"]').on('click', function () {
            document.body.classList.toggle('aiz-mobile-nav-open');
        });
        $('[data-toggle="aiz-side-menu"] a[href="#"]').on('click', function (event) {
            var submenu = $(this).next('ul');
            if (!submenu.length) return;
            event.preventDefault();
            submenu.slideToggle(140);
            $(this).attr('aria-expanded', submenu.is(':visible') ? 'true' : 'false');
        });
        $('#main-menu .aiz-side-nav-link.active').parents('.aiz-side-nav-list.level-2, .aiz-side-nav-list.level-3').show();
    });
    window.menuSearch = function () {
        var query = String($('#menu-search').val() || '').trim().toLowerCase();
        var results = $('#search-menu').empty();
        $('#main-menu').toggle(!query);
        if (!query) return;
        $('#main-menu a.aiz-side-nav-link[href]:not([href="#"])').each(function () {
            var link = $(this);
            if (link.text().toLowerCase().includes(query)) {
                results.append($('<li class="aiz-side-nav-item">').append(link.clone()));
            }
        });
    };
})(window, jQuery);
