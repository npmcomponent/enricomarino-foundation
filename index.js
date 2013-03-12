/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
/*jslint unparam: true, browser: true, indent: 2 */
var $ = jQuery = require('jquery');

(function () {
    Array.prototype.filter || (Array.prototype.filter = function (e) {
        "use strict";
        if (this == null) throw new TypeError;
        var t = Object(this),
            n = t.length >>> 0;
        if (typeof e != "function") try {
            throw new TypeError
        } catch (r) {
            return
        }
        var i = [],
            s = arguments[1];
        for (var o = 0; o < n; o++) if (o in t) {
            var u = t[o];
            e && e.call(s, u, o, t) && i.push(u)
        }
        return i
    }, Function.prototype.bind || (Function.prototype.bind = function (e) {
        if (typeof this != "function") throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var t = Array.prototype.slice.call(arguments, 1),
            n = this,
            r = function () {}, i = function () {
                return n.apply(this instanceof r && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
            };
        return r.prototype = this.prototype, i.prototype = new r, i
    })), $.fn.stop = $.fn.stop || function () {
        return this
    }
})(),
function (e, t, n) {
    "use strict";
    e.Foundation = {
        name: "Foundation",
        version: "4.0.0",
        cache: {},
        init: function (e, t, n, r, i, s) {
            var o, u = [e, n, r, i],
                a = [],
                s = s || !1;
            s && (this.nc = s), this.scope = e || this.scope;
            if (t && typeof t == "string") {
                if (/off/i.test(t)) return this.off();
                o = t.split(" ");
                if (o.length > 0) for (var f = o.length - 1; f >= 0; f--) a.push(this.init_lib(o[f], u))
            } else for (var l in this.libs) a.push(this.init_lib(l, u));
            return typeof t == "function" && u.unshift(t), this.response_obj(a, u)
        },
        response_obj: function (e, t) {
            for (var n in t) if (typeof t[n] == "function") return t[n]({
                errors: e.filter(function (e) {
                    if (typeof e == "string") return e
                })
            });
            return e
        },
        init_lib: function (e, t) {
            return this.trap(function () {
                if (this.libs.hasOwnProperty(e)) return this.patch(this.libs[e]), this.libs[e].init.apply(this.libs[e], t)
            }.bind(this), e)
        },
        trap: function (e, t) {
            if (!this.nc) try {
                return e()
            } catch (n) {
                return this.error({
                    name: t,
                    message: "could not be initialized",
                    more: n.name + " " + n.message
                })
            }
            return e()
        },
        patch: function (e) {
            this.fix_outer(e)
        },
        inherit: function (e, t) {
            var n = t.split(" ");
            for (var r = n.length - 1; r >= 0; r--) this.lib_methods.hasOwnProperty(n[r]) && (this.libs[e.name][n[r]] = this.lib_methods[n[r]])
        },
        libs: {},
        lib_methods: {
            set_data: function (e, t) {
                var n = this.name + +(new Date);
                Foundation.cache[n] = t, e.attr("data-" + this.name + "-id", n)
            },
            get_data: function (e) {
                return Foundation.cache[e.attr("data-" + this.name + "-id")]
            },
            remove_data: function (e) {
                e ? (delete Foundation.cache[e.attr("data-" + this.name + "-id")], e.attr("data-" + this.name + "-id", "")) : $("[data-" + this.name + "-id]").each(function () {
                    delete Foundation.cache[$(this).attr("data-" + this.name + "-id")], $(this).attr("data-" + this.name + "-id", "")
                })
            },
            throttle: function (e, t) {
                var n = null;
                return function () {
                    var r = this,
                        i = arguments;
                    clearTimeout(n), n = setTimeout(function () {
                        e.apply(r, i)
                    }, t)
                }
            },
            data_options: function (e) {
                function o(e) {
                    return typeof e == "string" ? $.trim(e) : e
                }
                var t = {}, n, r, i = (e.attr("data-options") || ":").split(";"),
                    s = i.length;
                for (n = s - 1; n >= 0; n--) r = i[n].split(":"), /true/i.test(r[1]) && (r[1] = !0), /false/i.test(r[1]) && (r[1] = !1), r.length === 2 && (t[o(r[0])] = o(r[1]));
                return t
            },
            delay: function (e, t) {
                return setTimeout(e, t)
            },
            scrollTo: function (t, n, r) {
                if (r < 0) return;
                var i = n - $(e).scrollTop(),
                    s = i / r * 10;
                this.scrollToTimerCache = setTimeout(function () {
                    isNaN(parseInt(s, 10)) || (e.scrollTo(0, $(e).scrollTop() + s), this.scrollTo(t, n, r - 10))
                }.bind(this), 10)
            },
            scrollLeft: function (e) {
                if (!e.length) return;
                return "scrollLeft" in e[0] ? e[0].scrollLeft : e[0].pageXOffset
            },
            empty: function (e) {
                if (e.length && e.length > 0) return !1;
                if (e.length && e.length === 0) return !0;
                for (var t in e) if (hasOwnProperty.call(e, t)) return !1;
                return !0
            }
        },
        fix_outer: function (e) {
            e.outerHeight = function (e, t) {
                return typeof Zepto == "function" ? e.height() : typeof t != "undefined" ? e.outerHeight(t) : e.outerHeight()
            }, e.outerWidth = function (e) {
                return typeof Zepto == "function" ? e.width() : typeof bool != "undefined" ? e.outerWidth(bool) : e.outerWidth()
            }
        },
        error: function (e) {
            return e.name + " " + e.message + "; " + e.more
        },
        off: function () {
            return $(this.scope).off(".fndtn"), $(e).off(".fndtn"), !0
        },
        zj: function () {
            try {
                return Zepto
            } catch (e) {
                return jQuery
            }
        }()
    }, $.fn.foundation = function () {
        var e = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
            return Foundation.init.apply(Foundation, [this].concat(e)), this
        })
    }
}(this, this.document),
function (e, t, n, r) {
    "use strict";
    Foundation.libs.dropdown = {
        name: "dropdown",
        version: "4.0.0",
        settings: {
            activeClass: "open"
        },
        init: function (t, n, r) {
            return this.scope = t || this.scope, Foundation.inherit(this, "throttle"), typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.settings.init || this.events(), this.settings.init) : this[n].call(this, r)
        },
        events: function () {
            var n = this;
            e(this.scope).on("click.fndtn.dropdown", "[data-dropdown]", function (t) {
                t.preventDefault(), t.stopPropagation(), n.toggle(e(this))
            }), e("*, html, body").on("click.fndtn.dropdown", function (t) {
                e(t.target).data("dropdown") || e("[data-dropdown-content]").css("left", "-99999px").removeClass(n.settings.activeClass)
            }), e("[data-dropdown-content]").on("click.fndtn.dropdown", function (e) {
                e.stopPropagation()
            }), e(t).on("resize.fndtn.dropdown", n.throttle(function () {
                n.resize.call(n)
            }, 50)).trigger("resize"), this.settings.init = !0
        },
        toggle: function (t, n) {
            var r = e("#" + t.data("dropdown"));
            e("[data-dropdown-content]").not(r).css("left", "-99999px"), r.hasClass(this.settings.activeClass) ? r.css("left", "-99999px").removeClass(this.settings.activeClass) : this.css(r.addClass(this.settings.activeClass), t)
        },
        resize: function () {
            var t = e("[data-dropdown-content].open"),
                n = e("[data-dropdown='" + t.attr("id") + "']");
            t.length && n.length && this.css(t, n)
        },
        css: function (e, t) {
            var n = t.offset();
            return this.small() ? e.css({
                position: "absolute",
                width: "95%",
                left: "2.5%",
                "max-width": "none",
                top: n.top + this.outerHeight(t)
            }) : e.attr("style", "").css({
                position: "absolute",
                top: n.top + this.outerHeight(t),
                left: n.left
            }), e
        },
        small: function () {
            return e(t).width() < 768 || e("html").hasClass("lt-ie9")
        },
        off: function () {
            e(this.scope).off(".fndtn.dropdown"), e("html, body").off(".fndtn.dropdown"), e(t).off(".fndtn.dropdown"), e("[data-dropdown-content]").off(".fndtn.dropdown"), this.settings.init = !1
        }
    }
}(Foundation.zj, this, this.document),
function (e, t, n, r) {
    "use strict";
    Foundation.libs.alerts = {
        name: "alerts",
        version: "4.0.0",
        settings: {
            speed: 300,
            callback: function () {}
        },
        init: function (t, n, r) {
            return this.scope = t || this.scope, typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.settings.init || this.events(), this.settings.init) : this[n].call(this, r)
        },
        events: function () {
            var t = this;
            e(this.scope).on("click.fndtn.alerts", "[data-alert] a.close", function (n) {
                n.preventDefault(), e(this).closest("[data-alert]").fadeOut(t.speed, function () {
                    e(this).remove(), t.settings.callback()
                })
            }), this.settings.init = !0
        },
        off: function () {
            e(this.scope).off(".fndtn.alerts")
        }
    }
}(Foundation.zj, this, this.document),
function (e, t, n, r) {
    "use strict";
    Foundation.libs.clearing = {
        name: "clearing",
        version: "4.0.0",
        settings: {
            templates: {
                viewing: '<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><img src="//:0"><p class="clearing-caption"></p><a href="#" class="clearing-main-left"><span></span></a><a href="#" class="clearing-main-right"><span></span></a></div>'
            },
            close_selectors: ".clearing-close",
            init: !1,
            locked: !1
        },
        init: function (t, n, r) {
            return this.scope = this.scope || t, Foundation.inherit(this, "set_data get_data remove_data throttle"), typeof n == "object" && (r = e.extend(!0, this.settings, n)), typeof n != "string" ? (e(this.scope).find("ul[data-clearing]").each(function () {
                var t = Foundation.libs.clearing,
                    n = e(this),
                    r = r || {}, i = t.get_data(n);
                i || (r.$parent = n.parent(), t.set_data(n, e.extend(!0, t.settings, r)), t.assemble(n.find("li")), t.settings.init || t.events().swipe_events())
            }), this.settings.init) : this[n].call(this, r)
        },
        events: function () {
            var n = this;
            return e(this.scope).on("click.fndtn.clearing", "ul[data-clearing] li", function (t, r, i) {
                var r = r || e(this),
                    i = i || r,
                    s = n.get_data(r.parent());
                t.preventDefault(), s || n.init(), n.open(e(t.target), r, i), n.update_paddles(i)
            }).on("click.fndtn.clearing", ".clearing-main-right", function (e) {
                this.nav(e, "next")
            }.bind(this)).on("click.fndtn.clearing", ".clearing-main-left", function (e) {
                this.nav(e, "prev")
            }.bind(this)).on("click.fndtn.clearing", this.settings.close_selectors, function (e) {
                Foundation.libs.clearing.close(e, this)
            }).on("keydown.fndtn.clearing", function (e) {
                this.keydown(e)
            }.bind(this)), e(t).on("resize.fndtn.clearing", function (e) {
                this.resize()
            }.bind(this)), this.settings.init = !0, this
        },
        swipe_events: function () {
            var t = this;
            e(this.scope).on("touchstart.fndtn.clearing", ".visible-img", function (t) {
                var n = {
                    start_page_x: t.touches[0].pageX,
                    start_page_y: t.touches[0].pageY,
                    start_time: (new Date).getTime(),
                    delta_x: 0,
                    is_scrolling: r
                };
                e(this).data("swipe-transition", n), t.stopPropagation()
            }).on("touchmove.fndtn.clearing", ".visible-img", function (n) {
                if (n.touches.length > 1 || n.scale && n.scale !== 1) return;
                var r = e(this).data("swipe-transition");
                typeof r == "undefined" && (r = {}), r.delta_x = n.touches[0].pageX - r.start_page_x, typeof r.is_scrolling == "undefined" && (r.is_scrolling = !! (r.is_scrolling || Math.abs(r.delta_x) < Math.abs(n.touches[0].pageY - r.start_page_y)));
                if (!r.is_scrolling && !r.active) {
                    n.preventDefault();
                    var i = r.delta_x < 0 ? "next" : "prev";
                    r.active = !0, t.nav(n, i)
                }
            }).on("touchend.fndtn.clearing", ".visible-img", function (t) {
                e(this).data("swipe-transition", {}), t.stopPropagation()
            })
        },
        assemble: function (e) {
            var t = e.parent(),
                n = this.get_data(t),
                r = t.detach(),
                i = {
                    grid: '<div class="carousel">' + this.outerHTML(r[0]) + "</div>",
                    viewing: n.templates.viewing
                }, s = '<div class="clearing-assembled"><div>' + i.viewing + i.grid + "</div></div>";
            return n.$parent.append(s)
        },
        open: function (e, t, n) {
            var r = n.closest(".clearing-assembled"),
                i = r.find("div").first(),
                s = i.find(".visible-img"),
                o = s.find("img").not(e);
            this.locked() || (o.attr("src", this.load(e)), this.loaded(o, function () {
                r.addClass("clearing-blackout"), i.addClass("clearing-container"), s.show(), this.fix_height(n).caption(s.find(".clearing-caption"), e).center(o).shift(t, n, function () {
                    n.siblings().removeClass("visible"), n.addClass("visible")
                })
            }.bind(this)))
        },
        close: function (t, n) {
            t.preventDefault();
            var r = function (e) {
                return /blackout/.test(e.selector) ? e : e.closest(".clearing-blackout")
            }(e(n)),
                i, s;
            return n === t.target && r && (i = r.find("div").first(), s = i.find(".visible-img"), this.settings.prev_index = 0, r.find("ul[data-clearing]").attr("style", "").closest(".clearing-blackout").removeClass("clearing-blackout"), i.removeClass("clearing-container"), s.hide()), !1
        },
        keydown: function (t) {
            var n = e(".clearing-blackout").find("ul[data-clearing]");
            t.which === 39 && this.go(n, "next"), t.which === 37 && this.go(n, "prev"), t.which === 27 && e("a.clearing-close").trigger("click")
        },
        nav: function (t, n) {
            var r = e(".clearing-blackout").find("ul[data-clearing]");
            t.preventDefault(), this.go(r, n)
        },
        resize: function () {
            var t = e(".clearing-blackout .visible-img").find("img");
            t.length && this.center(t)
        },
        fix_height: function (t) {
            var n = t.parent().children(),
                r = this;
            return n.each(function () {
                var t = e(this),
                    n = t.find("img");
                t.height() > r.outerHeight(n) && t.addClass("fix-height")
            }).closest("ul").width(n.length * 100 + "%"), this
        },
        update_paddles: function (e) {
            var t = e.closest(".carousel").siblings(".visible-img");
            e.next().length ? t.find(".clearing-main-right").removeClass("disabled") : t.find(".clearing-main-right").addClass("disabled"), e.prev().length ? t.find(".clearing-main-left").removeClass("disabled") : t.find(".clearing-main-left").addClass("disabled")
        },
        center: function (e) {
            return e.css({
                marginLeft: -(this.outerWidth(e) / 2),
                marginTop: -(this.outerHeight(e) / 2)
            }), this
        },
        load: function (e) {
            var t = e.parent().attr("href");
            return this.preload(e), t ? t : e.attr("src")
        },
        preload: function (e) {
            this.img(e.closest("li").next()).img(e.closest("li").prev())
        },
        loaded: function (e, t) {
            function n() {
                t()
            }
            function r() {
                this.one("load", n);
                if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                    var e = this.attr("src"),
                        t = e.match(/\?/) ? "&" : "?";
                    t += "random=" + (new Date).getTime(), this.attr("src", e + t)
                }
            }
            if (!e.attr("src")) {
                n();
                return
            }
            this.complete || this.readyState === 4 ? n() : r.call(e)
        },
        img: function (e) {
            if (e.length) {
                var t = new Image,
                    n = e.find("a");
                n.length ? t.src = n.attr("href") : t.src = e.find("img").attr("src")
            }
            return this
        },
        caption: function (e, t) {
            var n = t.data("caption");
            return n ? e.text(n).show() : e.text("").hide(), this
        },
        go: function (e, t) {
            var n = e.find(".visible"),
                r = n[t]();
            r.length && r.find("img").trigger("click", [n, r])
        },
        shift: function (e, t, n) {
            var r = t.parent(),
                i = this.settings.prev_index || t.index(),
                s = this.direction(r, e, t),
                o = parseInt(r.css("left"), 10),
                u = this.outerWidth(t),
                a;
            t.index() !== i && !/skip/.test(s) ? /left/.test(s) ? (this.lock(), r.animate({
                left: o + u
            }, 300, this.unlock())) : /right/.test(s) && (this.lock(), r.animate({
                left: o - u
            }, 300, this.unlock())) : /skip/.test(s) && (a = t.index() - this.settings.up_count, this.lock(), a > 0 ? r.animate({
                left: -(a * u)
            }, 300, this.unlock()) : r.animate({
                left: 0
            }, 300, this.unlock())), n()
        },
        direction: function (t, n, r) {
            var i = t.find("li"),
                s = this.outerWidth(i) + this.outerWidth(i) / 4,
                o = Math.floor(this.outerWidth(e(".clearing-container")) / s) - 1,
                u = i.index(r),
                a;
            return this.settings.up_count = o, this.adjacent(this.settings.prev_index, u) ? u > o && u > this.settings.prev_index ? a = "right" : u > o - 1 && u <= this.settings.prev_index ? a = "left" : a = !1 : a = "skip", this.settings.prev_index = u, a
        },
        adjacent: function (e, t) {
            for (var n = t + 1; n >= t - 1; n--) if (n === e) return !0;
            return !1
        },
        lock: function () {
            this.settings.locked = !0
        },
        unlock: function () {
            this.settings.locked = !1
        },
        locked: function () {
            return this.settings.locked
        },
        outerHTML: function (e) {
            return e.outerHTML || (new XMLSerializer).serializeToString(e)
        },
        off: function () {
            e(this.scope).off(".fndtn.clearing"), e(t).off(".fndtn.clearing"), this.remove_data(), this.settings.init = !1
        }
    }
}(Foundation.zj, this, this.document),
function (e, t, n) {
    function f(e) {
        var t = {}, r = /^jQuery\d+$/;
        return n.each(e.attributes, function (e, n) {
            n.specified && !r.test(n.name) && (t[n.name] = n.value)
        }), t
    }
    function l(e, r) {
        var i = this,
            s = n(i);
        if (i.value == s.attr("placeholder") && s.hasClass("placeholder")) if (s.data("placeholder-password")) {
            s = s.hide().next().show().attr("id", s.removeAttr("id").data("placeholder-id"));
            if (e === !0) return s[0].value = r;
            s.focus()
        } else i.value = "", s.removeClass("placeholder"), i == t.activeElement && i.select()
    }
    function c() {
        var e, t = this,
            r = n(t),
            i = r,
            s = this.id;
        if (t.value == "") {
            if (t.type == "password") {
                if (!r.data("placeholder-textinput")) {
                    try {
                        e = r.clone().attr({
                            type: "text"
                        })
                    } catch (o) {
                        e = n("<input>").attr(n.extend(f(this), {
                            type: "text"
                        }))
                    }
                    e.removeAttr("name").data({
                        "placeholder-password": !0,
                        "placeholder-id": s
                    }).bind("focus.placeholder", l), r.data({
                        "placeholder-textinput": e,
                        "placeholder-id": s
                    }).before(e)
                }
                r = r.removeAttr("id").hide().prev().attr("id", s).show()
            }
            r.addClass("placeholder"), r[0].value = r.attr("placeholder")
        } else r.removeClass("placeholder")
    }
    var r = "placeholder" in t.createElement("input"),
        i = "placeholder" in t.createElement("textarea"),
        s = n.fn,
        o = n.valHooks,
        u, a;
    r && i ? (a = s.placeholder = function () {
        return this
    }, a.input = a.textarea = !0) : (a = s.placeholder = function () {
        var e = this;
        return e.filter((r ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
            "focus.placeholder": l,
            "blur.placeholder": c
        }).data("placeholder-enabled", !0).trigger("blur.placeholder"), e
    }, a.input = r, a.textarea = i, u = {
        get: function (e) {
            var t = n(e);
            return t.data("placeholder-enabled") && t.hasClass("placeholder") ? "" : e.value
        },
        set: function (e, r) {
            var i = n(e);
            return i.data("placeholder-enabled") ? (r == "" ? (e.value = r, e != t.activeElement && c.call(e)) : i.hasClass("placeholder") ? l.call(e, !0, r) || (e.value = r) : e.value = r, i) : e.value = r
        }
    }, r || (o.input = u), i || (o.textarea = u), n(function () {
        n(t).delegate("form", "submit.placeholder", function () {
            var e = n(".placeholder", this).each(l);
            setTimeout(function () {
                e.each(c)
            }, 10)
        })
    }), n(e).bind("beforeunload.placeholder", function () {
        n(".placeholder").each(function () {
            this.value = ""
        })
    }))
}(this, document, Foundation.zj),
function (e, t, n, r) {
    "use strict";
    Foundation.libs.forms = {
        name: "forms",
        version: "4.0.4",
        settings: {
            disable_class: "no-custom"
        },
        init: function (t, n, r) {
            return this.scope = t || this.scope, typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.settings.init || this.events(), this.assemble(), this.settings.init) : this[n].call(this, r)
        },
        assemble: function () {
            e('form.custom input[type="radio"]', e(this.scope)).not('[data-customforms="disabled"]').each(this.append_custom_markup), e('form.custom input[type="checkbox"]', e(this.scope)).not('[data-customforms="disabled"]').each(this.append_custom_markup), e("form.custom select", e(this.scope)).not('[data-customforms="disabled"]').each(this.append_custom_select)
        },
        events: function () {
            var t = this;
            e(this.scope).on("change.fndtn.forms", 'form.custom select:not([data-customforms="disabled"])', function (n) {
                t.refresh_custom_select(e(this))
            }).on("click.fndtn.forms", "form.custom label", function (n) {
                var r = e("#" + t.escape(e(this).attr("for")) + ':not([data-customforms="disabled"])'),
                    i, s;
                r.length !== 0 && (r.attr("type") === "checkbox" ? (n.preventDefault(), i = e(this).find("span.custom.checkbox"), i.length == 0 && (i = e(this).next("span.custom.checkbox")), i.length == 0 && (i = e(this).prev("span.custom.checkbox")), t.toggle_checkbox(i)) : r.attr("type") === "radio" && (n.preventDefault(), s = e(this).find("span.custom.radio"), s.length == 0 && (s = e(this).next("span.custom.radio")), s.length == 0 && (s = e(this).prev("span.custom.radio")), t.toggle_radio(s)))
            }).on("click.fndtn.forms", "form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector", function (n) {
                var r = e(this),
                    i = r.closest("div.custom.dropdown"),
                    s = i.prev();
                i.hasClass("open") || e(t.scope).trigger("click"), n.preventDefault();
                if (!1 === s.is(":disabled")) return i.toggleClass("open"), i.hasClass("open") ? e(t.scope).on("click.fndtn.forms.customdropdown", function () {
                    i.removeClass("open"), e(t.scope).off(".fndtn.forms.customdropdown")
                }) : e(t.scope).on(".fndtn.forms.customdropdown"), !1
            }).on("click.fndtn.forms touchend.fndtn.forms", "form.custom div.custom.dropdown li", function (t) {
                var n = e(this),
                    r = n.closest("div.custom.dropdown"),
                    i = r.prev(),
                    s = 0;
                t.preventDefault(), t.stopPropagation();
                if (!e(this).hasClass("disabled")) {
                    e("div.dropdown").not(r).removeClass("open");
                    var o = n.closest("ul").find("li.selected");
                    o.removeClass("selected"), n.addClass("selected"), r.removeClass("open").find("a.current").html(n.html()), n.closest("ul").find("li").each(function (e) {
                        n[0] == this && (s = e)
                    }), i[0].selectedIndex = s, i.data("prevalue", o.html()), i.trigger("change")
                }
            }), this.settings.init = !0
        },
        append_custom_markup: function (t, n) {
            var r = e(n).hide(),
                i = r.attr("type"),
                s = r.next("span.custom." + i);
            s.length === 0 && (s = e('<span class="custom ' + i + '"></span>').insertAfter(r)), s.toggleClass("checked", r.is(":checked")), s.toggleClass("disabled", r.is(":disabled"))
        },
        append_custom_select: function (t, n) {
            var r = Foundation.libs.forms,
                i = e(n),
                s = i.next("div.custom.dropdown"),
                o = s.find("ul"),
                u = s.find(".current"),
                a = s.find(".selector"),
                f = i.find("option"),
                l = f.filter(":selected"),
                c = i.attr("class") ? i.attr("class").split(" ") : [],
                h = 0,
                p = "",
                d, v = !1;
            if (i.hasClass(r.settings.disable_class)) return;
            if (s.length === 0) {
                var m = i.hasClass("small") ? "small" : i.hasClass("medium") ? "medium" : i.hasClass("large") ? "large" : i.hasClass("expand") ? "expand" : "";
                s = e('<div class="' + ["custom", "dropdown", m].concat(c).filter(function (e, t, n) {
                    return e == "" ? !1 : n.indexOf(e) == t
                }).join(" ") + '"><a href="#" class="selector"></a><ul /></div>'), a = s.find(".selector"), o = s.find("ul"), p = f.map(function () {
                    return "<li>" + e(this).html() + "</li>"
                }).get().join(""), o.append(p), v = s.prepend('<a href="#" class="current">' + l.html() + "</a>").find(".current"), i.after(s).hide()
            } else p = f.map(function () {
                return "<li>" + e(this).html() + "</li>"
            }).get().join(""), o.html("").append(p);
            s.toggleClass("disabled", i.is(":disabled")), d = o.find("li"), f.each(function (t) {
                this.selected && (d.eq(t).addClass("selected"), v && v.html(e(this).html())), e(this).is(":disabled") && d.eq(t).addClass("disabled")
            });
            if (!s.is(".small, .medium, .large, .expand")) {
                s.addClass("open");
                var r = Foundation.libs.forms;
                r.hidden_fix.adjust(o), h = r.outerWidth(d) > h ? r.outerWidth(d) : h, Foundation.libs.forms.hidden_fix.reset(), s.removeClass("open")
            }
        },
        refresh_custom_select: function (t) {
            var n = this,
                r = 0,
                i = t.next(),
                s = t.find("option");
            i.find("ul").html(""), s.each(function () {
                var t = e("<li>" + e(this).html() + "</li>");
                i.find("ul").append(t)
            }), s.each(function (t) {
                this.selected && (i.find("li").eq(t).addClass("selected"), i.find(".current").html(e(this).html())), e(this).is(":disabled") && i.find("li").eq(t).addClass("disabled")
            }), i.removeAttr("style").find("ul").removeAttr("style"), i.find("li").each(function () {
                i.addClass("open"), n.outerWidth(e(this)) > r && (r = n.outerWidth(e(this))), i.removeClass("open")
            })
        },
        toggle_checkbox: function (e) {
            var t = e.prev(),
                n = t[0];
            !1 === t.is(":disabled") && (n.checked = n.checked ? !1 : !0, e.toggleClass("checked"), t.trigger("change"))
        },
        toggle_radio: function (e) {
            var t = e.prev(),
                n = t.closest("form.custom"),
                r = t[0];
            !1 === t.is(":disabled") && (n.find('input[type="radio"][name="' + this.escape(t.attr("name")) + '"]').next().not(e).removeClass("checked"), e.hasClass("checked") || e.toggleClass("checked"), r.checked = e.hasClass("checked"), t.trigger("change"))
        },
        escape: function (e) {
            return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        },
        hidden_fix: {
            tmp: [],
            hidden: null,
            adjust: function (t) {
                var n = this;
                n.hidden = t.parents().andSelf().filter(":hidden"), n.hidden.each(function () {
                    var t = e(this);
                    n.tmp.push(t.attr("style")), t.css({
                        visibility: "hidden",
                        display: "block"
                    })
                })
            },
            reset: function () {
                var t = this;
                t.hidden.each(function (n) {
                    var i = e(this),
                        s = t.tmp[n];
                    s === r ? i.removeAttr("style") : i.attr("style", s)
                }), t.tmp = [], t.hidden = null
            }
        },
        off: function () {
            e(this.scope).off(".fndtn.forms")
        }
    }
}(Foundation.zj, this, this.document),
function (e, t, n) {
    function i(e) {
        return e
    }
    function s(e) {
        return decodeURIComponent(e.replace(r, " "))
    }
    var r = /\+/g,
        o = e.cookie = function (r, u, a) {
            if (u !== n) {
                a = e.extend({}, o.defaults, a), u === null && (a.expires = -1);
                if (typeof a.expires == "number") {
                    var f = a.expires,
                        l = a.expires = new Date;
                    l.setDate(l.getDate() + f)
                }
                return u = o.json ? JSON.stringify(u) : String(u), t.cookie = [encodeURIComponent(r), "=", o.raw ? u : encodeURIComponent(u), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
            }
            var c = o.raw ? i : s,
                h = t.cookie.split("; ");
            for (var p = 0, d = h.length; p < d; p++) {
                var v = h[p].split("=");
                if (c(v.shift()) === r) {
                    var m = c(v.join("="));
                    return o.json ? JSON.parse(m) : m
                }
            }
            return null
        };
    o.defaults = {}, e.removeCookie = function (t, n) {
        return e.cookie(t) !== null ? (e.cookie(t, null, n), !0) : !1
    }
}(Foundation.zj, document),
function (e, t, n, r) {
    "use strict";
    Foundation.libs.joyride = {
        name: "joyride",
        version: "4.0.0",
        defaults: {
            tipLocation: "bottom",
            nubPosition: "auto",
            scrollSpeed: 300,
            timer: 0,
            startTimerOnClick: !0,
            startOffset: 0,
            nextButton: !0,
            tipAnimation: "fade",
            pauseAfter: [],
            tipAnimationFadeSpeed: 300,
            cookieMonster: !1,
            cookieName: "joyride",
            cookieDomain: !1,
            cookieExpires: 365,
            tipContainer: "body",
            postRideCallback: function () {},
            postStepCallback: function () {},
            template: {
                link: '<a href="#close" class="joyride-close-tip">&times;</a>',
                timer: '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
                tip: '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
                wrapper: '<div class="joyride-content-wrapper"></div>',
                button: '<a href="#" class="small button joyride-next-tip"></a>'
            }
        },
        settings: {},
        init: function (t, n, r) {
            return this.scope = t || this.scope, Foundation.inherit(this, "throttle data_options scrollTo scrollLeft delay"), typeof n == "object" ? e.extend(!0, this.settings, this.defaults, n) : e.extend(!0, this.settings, this.defaults, r), typeof n != "string" ? (this.settings.init || this.events(), this.settings.init) : this[n].call(this, r)
        },
        events: function () {
            var n = this;
            e(this.scope).on("click.joyride", ".joyride-next-tip, .joyride-modal-bg", function (e) {
                e.preventDefault(), this.settings.$li.next().length < 1 ? this.end() : this.settings.timer > 0 ? (clearTimeout(this.settings.automate), this.hide(), this.show(), this.startTimer()) : (this.hide(), this.show())
            }.bind(this)).on("click.joyride", ".joyride-close-tip", function (e) {
                e.preventDefault(), this.end()
            }.bind(this)), e(t).on("resize.fndtn.joyride", n.throttle(function () {
                e("[data-joyride]").length > 0 && n.settings.$next_tip && (n.is_phone() ? n.pos_phone() : n.pos_default())
            }, 100)), this.settings.init = !0
        },
        start: function () {
            var t = this,
                n = e(this.scope).find("[data-joyride]"),
                r = ["timer", "scrollSpeed", "startOffset", "tipAnimationFadeSpeed", "cookieExpires"],
                i = r.length;
            this.settings.init || this.init(), e.extend(!0, this.settings, this.data_options(n)), this.settings.$content_el = n, this.settings.body_offset = e(this.settings.tipContainer).position(), this.settings.$tip_content = this.settings.$content_el.find("> li"), this.settings.paused = !1, this.settings.attempts = 0;
            for (var s = i - 1; s >= 0; s--) this.settings[r[s]] = parseInt(this.settings[r[s]], 10);
            this.settings.tipLocationPatterns = {
                top: ["bottom"],
                bottom: [],
                left: ["right", "top", "bottom"],
                right: ["left", "top", "bottom"]
            }, typeof e.cookie != "function" && (this.settings.cookieMonster = !1);
            if (!this.settings.cookieMonster || this.settings.cookieMonster && e.cookie(this.settings.cookieName) === null) this.settings.$tip_content.each(function (n) {
                t.create({
                    $li: e(this),
                    index: n
                })
            }), !this.settings.startTimerOnClick && this.settings.timer > 0 ? (this.show("init"), this.startTimer()) : this.show("init")
        },
        resume: function () {
            this.set_li(), this.show()
        },
        tip_template: function (t) {
            var n, r;
            return t.tip_class = t.tip_class || "", n = e(this.settings.template.tip).addClass(t.tip_class), r = e.trim(e(t.li).html()) + this.button_text(t.button_text) + this.settings.template.link + this.timer_instance(t.index), n.append(e(this.settings.template.wrapper)), n.first().attr("data-index", t.index), e(".joyride-content-wrapper", n).append(r), n[0]
        },
        timer_instance: function (t) {
            var n;
            return t === 0 && this.settings.startTimerOnClick && this.settings.timer > 0 || this.settings.timer === 0 ? n = "" : n = this.outerHTML(e(this.settings.template.timer)[0]), n
        },
        button_text: function (t) {
            return this.settings.nextButton ? (t = e.trim(t) || "Next", t = this.outerHTML(e(this.settings.template.button).append(t)[0])) : t = "", t
        },
        create: function (t) {
            var n = t.$li.attr("data-button") || t.$li.attr("data-text"),
                r = t.$li.attr("class"),
                i = e(this.tip_template({
                    tip_class: r,
                    index: t.index,
                    button_text: n,
                    li: t.$li
                }));
            e(this.settings.tipContainer).append(i)
        },
        show: function (t) {
            var n = null;
            this.settings.$li === r || e.inArray(this.settings.$li.index(), this.settings.pauseAfter) === -1 ? (this.settings.paused ? this.settings.paused = !1 : this.set_li(t), this.settings.attempts = 0, this.settings.$li.length && this.settings.$target.length > 0 ? (this.settings.tipSettings = e.extend(!0, this.settings, this.data_options(this.settings.$li)), this.settings.timer = parseInt(this.settings.timer, 10), this.settings.tipSettings.tipLocationPattern = this.settings.tipLocationPatterns[this.settings.tipSettings.tipLocation], /body/i.test(this.settings.$target.selector) || this.scroll_to(), this.is_phone() ? this.pos_phone(!0) : this.pos_default(!0), n = this.settings.$next_tip.find(".joyride-timer-indicator"), /pop/i.test(this.settings.tipAnimation) ? (n.width(0), thsi.settings.timer > 0 ? (this.settings.$next_tip.show(), this.delay(function () {
                n.animate({
                    width: n.parent().width()
                }, this.settings.timer, "linear")
            }.bind(this), this.settings.tipAnimationFadeSpeed)) : this.settings.$next_tip.show()) : /fade/i.test(this.settings.tipAnimation) && (n.width(0), this.settings.timer > 0 ? (this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed).show(), this.delay(function () {
                n.animate({
                    width: n.parent().width()
                }, this.settings.timer, "linear")
            }.bind(this), this.settings.tipAnimationFadeSpeed)) : this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed)), this.settings.$current_tip = this.settings.$next_tip) : this.settings.$li && this.settings.$target.length < 1 ? this.show() : this.end()) : this.settings.paused = !0
        },
        is_phone: function () {
            return Modernizr ? Modernizr.mq("only screen and (max-width: 767px)") || e(".lt-ie9").length > 0 : this.settings.$window.width() < 767 ? !0 : !1
        },
        hide: function () {
            this.settings.postStepCallback(this.settings.$li.index(), this.settings.$current_tip), e(".joyride-modal-bg").hide(), this.settings.$current_tip.hide()
        },
        set_li: function (e) {
            e ? (this.settings.$li = this.settings.$tip_content.eq(this.settings.startOffset), this.set_next_tip(), this.settings.$current_tip = this.settings.$next_tip) : (this.settings.$li = this.settings.$li.next(), this.set_next_tip()), this.set_target()
        },
        set_next_tip: function () {
            this.settings.$next_tip = e(".joyride-tip-guide[data-index='" + this.settings.$li.index() + "']"), this.settings.$next_tip.data("closed", "")
        },
        set_target: function () {
            var t = this.settings.$li.attr("data-class"),
                r = this.settings.$li.attr("data-id"),
                i = function () {
                    return r ? e(n.getElementById(r)) : t ? e("." + t).first() : e("body")
                };
            this.settings.$target = i()
        },
        scroll_to: function () {
            var n, r;
            n = e(t).height() / 2, r = Math.ceil(this.settings.$target.offset().top - n + this.outerHeight(this.settings.$next_tip)), r > 0 && this.scrollTo(e("html, body"), r, this.settings.scrollSpeed)
        },
        paused: function () {
            return e.inArray(this.settings.$li.index() + 1, this.settings.pauseAfter) === -1 ? !0 : !1
        },
        restart: function () {
            this.hide(), this.settings.$li = r, this.show("init")
        },
        pos_default: function (n) {
            var r = Math.ceil(e(t).height() / 2),
                i = this.settings.$next_tip.offset(),
                s = this.settings.$next_tip.find(".joyride-nub"),
                o = Math.ceil(this.outerHeight(s) / 2),
                u = n || !1;
            u && (this.settings.$next_tip.css("visibility", "hidden"), this.settings.$next_tip.show()), /body/i.test(this.settings.$target.selector) ? this.settings.$li.length && this.pos_modal(s) : (this.bottom() ? (this.settings.$next_tip.css({
                top: this.settings.$target.offset().top + o + this.outerHeight(this.settings.$target),
                left: this.settings.$target.offset().left
            }), this.nub_position(s, this.settings.tipSettings.nubPosition, "top")) : this.top() ? (this.settings.$next_tip.css({
                top: this.settings.$target.offset().top - this.outerHeight(this.settings.$next_tip) - o,
                left: this.settings.$target.offset().left
            }), this.nub_position(s, this.settings.tipSettings.nubPosition, "bottom")) : this.right() ? (this.settings.$next_tip.css({
                top: this.settings.$target.offset().top,
                left: this.outerWidth(this.settings.$target) + this.settings.$target.offset().left
            }), this.nub_position(s, this.settings.tipSettings.nubPosition, "left")) : this.left() && (this.settings.$next_tip.css({
                top: this.settings.$target.offset().top,
                left: this.settings.$target.offset().left - this.outerWidth(this.settings.$next_tip) - o
            }), this.nub_position(s, this.settings.tipSettings.nubPosition, "right")), !this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tipSettings.tipLocationPattern.length && (s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"), this.settings.tipSettings.tipLocation = this.settings.tipSettings.tipLocationPattern[this.settings.attempts], this.settings.attempts++, this.pos_default(!0))), u && (this.settings.$next_tip.hide(), this.settings.$next_tip.css("visibility", "visible"))
        },
        pos_phone: function (t) {
            var n = this.outerHeight(this.settings.$next_tip),
                r = this.settings.$next_tip.offset(),
                i = this.outerHeight(this.settings.$target),
                s = e(".joyride-nub", this.settings.$next_tip),
                o = Math.ceil(this.outerHeight(s) / 2),
                u = t || !1;
            s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"), u && (this.settings.$next_tip.css("visibility", "hidden"), this.settings.$next_tip.show()), /body/i.test(this.settings.$target.selector) ? this.settings.$li.length && this.pos_modal(s) : this.top() ? (this.settings.$next_tip.offset({
                top: this.settings.$target.offset().top - n - o
            }), s.addClass("bottom")) : (this.settings.$next_tip.offset({
                top: this.settings.$target.offset().top + i + o
            }), s.addClass("top")), u && (this.settings.$next_tip.hide(), this.settings.$next_tip.css("visibility", "visible"))
        },
        pos_modal: function (t) {
            this.center(), t.hide(), this.settings.$next_tip.data("closed") || (e(".joyride-modal-bg").length < 1 && e("body").append('<div class="joyride-modal-bg">').show(), /pop/i.test(this.settings.tipAnimation) ? e(".joyride-modal-bg").show() : e(".joyride-modal-bg").fadeIn(this.settings.tipAnimationFadeSpeed))
        },
        center: function () {
            var n = e(t);
            return this.settings.$next_tip.css({
                top: (n.height() - this.outerHeight(this.settings.$next_tip)) / 2 + n.scrollTop(),
                left: (n.width() - this.outerWidth(this.settings.$next_tip)) / 2 + this.scrollLeft(n)
            }), !0
        },
        bottom: function () {
            return /bottom/i.test(this.settings.tipSettings.tipLocation)
        },
        top: function () {
            return /top/i.test(this.settings.tipSettings.tipLocation)
        },
        right: function () {
            return /right/i.test(this.settings.tipSettings.tipLocation)
        },
        left: function () {
            return /left/i.test(this.settings.tipSettings.tipLocation)
        },
        corners: function (n) {
            var r = e(t),
                i = r.width() + this.scrollLeft(r),
                s = r.width() + r.scrollTop();
            return [n.offset().top <= r.scrollTop(), i <= n.offset().left + this.outerWidth(n), s <= n.offset().top + this.outerHeight(n), this.scrollLeft(r) >= n.offset().left]
        },
        visible: function (e) {
            var t = e.length;
            while (t--) if (e[t]) return !1;
            return !0
        },
        nub_position: function (e, t, n) {
            t === "auto" ? e.addClass(n) : e.addClass(t)
        },
        startTimer: function () {
            this.settings.$li.length ? this.settings.automate = setTimeout(function () {
                this.hide(), this.show(), this.startTimer()
            }.bind(this), this.settings.timer) : clearTimeout(this.settings.automate)
        },
        end: function () {
            this.settings.cookieMonster && e.cookie(this.settings.cookieName, "ridden", {
                expires: this.settings.cookieExpires,
                domain: this.settings.cookieDomain
            }), this.settings.timer > 0 && clearTimeout(this.settings.automate), this.settings.$next_tip.data("closed", !0), e(".joyride-modal-bg").hide(), this.settings.$current_tip.hide(), this.settings.postStepCallback(this.settings.$li.index(), this.settings.$current_tip), this.settings.postRideCallback(this.settings.$li.index(), this.settings.$current_tip)
        },
        outerHTML: function (e) {
            return e.outerHTML || (new XMLSerializer).serializeToString(e)
        },
        off: function () {
            e(this.scope).off(".joyride"), e(t).off(".joyride"), e(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"), e(".joyride-tip-guide, .joyride-modal-bg").remove(), clearTimeout(this.settings.automate), this.settings = {}
        }
    }
}(Foundation.zj, this, this.document),
function (e, t, n, r) {
    "use strict";
    Foundation.libs.magellan = {
        name: "magellan",
        version: "4.0.0",
        settings: {
            activeClass: "active"
        },
        init: function (t, n, r) {
            return this.scope = t || this.scope, Foundation.inherit(this, "data_options"), typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.settings.init || (this.fixed_magellan = e("[data-magellan-expedition]"), this.set_threshold(), this.last_destination = e("[data-magellan-destination]").last(), this.events()), this.settings.init) : this[n].call(this, r)
        },
        events: function () {
            var n = this;
            e(this.scope).on("arrival.fndtn.magellan", "[data-magellan-arrival]", function (t) {
                var r = e(this),
                    i = r.closest("[data-magellan-expedition]"),
                    s = i.attr("data-magellan-active-class") || n.settings.activeClass;
                r.closest("[data-magellan-expedition]").find("[data-magellan-arrival]").not(r).removeClass(s), r.addClass(s)
            }), this.fixed_magellan.on("update-position.fndtn.magellan", function () {
                var t = e(this)
            }).trigger("update-position"), e(t).on("resize.fndtn.magellan", function () {
                this.fixed_magellan.trigger("update-position")
            }.bind(this)).on("scroll.fndtn.magellan", function () {
                var r = e(t).scrollTop();
                n.fixed_magellan.each(function () {
                    var t = e(this);
                    typeof t.data("magellan-top-offset") == "undefined" && t.data("magellan-top-offset", t.offset().top), typeof t.data("magellan-fixed-position") == "undefined" && t.data("magellan-fixed-position", !1);
                    var i = r + n.settings.threshold > t.data("magellan-top-offset"),
                        s = t.attr("data-magellan-top-offset");
                    t.data("magellan-fixed-position") != i && (t.data("magellan-fixed-position", i), i ? t.css({
                        position: "fixed",
                        top: 0
                    }) : t.css({
                        position: "",
                        top: ""
                    }), i && typeof s != "undefined" && s != 0 && t.css({
                        position: "fixed",
                        top: s + "px"
                    }))
                })
            }), this.last_destination.length > 0 && e(t).on("scroll.fndtn.magellan", function (r) {
                var i = e(t).scrollTop(),
                    s = i + e(t).height(),
                    o = Math.ceil(n.last_destination.offset().top);
                e("[data-magellan-destination]").each(function () {
                    var t = e(this),
                        r = t.attr("data-magellan-destination"),
                        u = t.offset().top - i;
                    u <= n.settings.threshold && e("[data-magellan-arrival='" + r + "']").trigger("arrival"), s >= e(n.scope).height() && o > i && o < s && e("[data-magellan-arrival]").last().trigger("arrival")
                })
            }), this.settings.init = !0
        },
        set_threshold: function () {
            this.settings.threshold || (this.settings.threshold = this.fixed_magellan.length > 0 ? this.outerHeight(this.fixed_magellan, !0) : 0)
        },
        off: function () {
            e(this.scope).off(".fndtn.magellan")
        }
    }
}(Foundation.zj, this, this.document),
function (e, t, n, r) {
    "use strict";
    Foundation.libs = Foundation.libs || {}, Foundation.libs.orbit = {
        version: "4.0.0",
        settings: {
            timer_speed: 1e4,
            animation_speed: 500,
            bullets: !0,
            stack_on_small: !0,
            container_class: "orbit-container",
            stack_on_small_class: "orbit-stack-on-small",
            next_class: "orbit-next",
            prev_class: "orbit-prev",
            timer_container_class: "orbit-timer",
            timer_paused_class: "paused",
            timer_progress_class: "orbit-progress",
            slides_container_class: "orbit-slides-container",
            bullets_container_class: "orbit-bullets",
            bullets_active_class: "active",
            slide_number_class: "orbit-slide-number",
            caption_class: "orbit-caption",
            active_slide_class: "active",
            orbit_transition_class: "orbit-transitioning"
        },
        init: function (t, n, r) {
            var i = this;
            typeof n == "object" && e.extend(!0, i.settings, n), e("[data-orbit]", t).each(e.proxy(i._init, i))
        },
        _container_html: function () {
            var e = this;
            return '<div class="' + e.settings.container_class + '"></div>'
        },
        _bullets_container_html: function (t) {
            var n = this,
                r = e('<ol class="' + n.settings.bullets_container_class + '"></ol>');
            return t.each(function (t, i) {
                var s = e('<li data-orbit-slide-number="' + (t + 1) + '" class=""></li>');
                t === 0 && s.addClass(n.settings.bullets_active_class), r.append(s)
            }), r
        },
        _slide_number_html: function (t, n) {
            var r = this,
                i = e('<div class="' + r.settings.slide_number_class + '"></div>');
            return i.append("<span>" + t + "</span> of <span>" + n + "</span>"), i
        },
        _timer_html: function () {
            var e = this;
            return typeof e.settings.timer_speed == "number" && e.settings.timer_speed > 0 ? '<div class="' + e.settings.timer_container_class + '"><span></span><div class="' + e.settings.timer_progress_class + '"></div></div>' : ""
        },
        _next_html: function () {
            var e = this;
            return '<a href="#" class="' + e.settings.next_class + '">Next <span></span></a>'
        },
        _prev_html: function () {
            var e = this;
            return '<a href="#" class="' + e.settings.prev_class + '">Prev <span></span></a>'
        },
        _init: function (t, n) {
            var r = this,
                i = e(n),
                s = i.wrap(r._container_html()).parent(),
                o = i.children();
            s.append(r._prev_html()), s.append(r._next_html()), i.addClass(r.settings.slides_container_class), r.settings.stack_on_small && s.addClass(r.settings.stack_on_small_class), s.append(r._slide_number_html(1, o.length)), s.append(r._timer_html()), r.settings.bullets && s.after(r._bullets_container_html(o)), i.append(o.first().clone().attr("data-orbit-slide", "")), i.prepend(o.last().clone().attr("data-orbit-slide", "")), i.css("marginLeft", "-100%"), o.first().addClass(r.settings.active_slide_class), r._init_events(i), r._init_dimensions(i), r._start_timer(i)
        },
        _init_events: function (i) {
            var s = this,
                o = i.parent();
            e(t).on("load.fndtn.orbit", function () {
                i.height(""), i.height(i.height(o.height())), i.trigger("orbit:ready")
            }).on("resize.fndtn.orbit", function () {
                i.height(""), i.height(i.height(o.height()))
            }), e(n).on("click.fndtn.orbit", "[data-orbit-link]", function (t) {
                t.preventDefault();
                var n = e(t.currentTarget).attr("data-orbit-link"),
                    r = i.find("[data-orbit-slide=" + n + "]").first();
                r.length === 1 && (s._reset_timer(i, !0), s.goto(i, r.index(), function () {}))
            }), o.siblings("." + s.settings.bullets_container_class).on("click.fndtn.orbit", "[data-orbit-slide-number]", function (t) {
                t.preventDefault(), s._reset_timer(i, !0), s.goto(i, e(t.currentTarget).data("orbit-slide-number"), function () {})
            }), o.on("orbit:after-slide-change.fndtn.orbit", function (e, t) {
                var n = o.find("." + s.settings.slide_number_class);
                n.length === 1 && n.replaceWith(s._slide_number_html(t.slide_number, t.total_slides))
            }).on("orbit:next-slide.fndtn.orbit click.fndtn.orbit", "." + s.settings.next_class, function (e) {
                e.preventDefault(), s._reset_timer(i, !0), s.goto(i, "next", function () {})
            }).on("orbit:prev-slide.fndtn.orbit click.fndtn.orbit", "." + s.settings.prev_class, function (e) {
                e.preventDefault(), s._reset_timer(i, !0), s.goto(i, "prev", function () {})
            }).on("orbit:toggle-play-pause.fndtn.orbit click.fndtn.orbit touchstart.fndtn.orbit", "." + s.settings.timer_container_class, function (t) {
                t.preventDefault();
                var n = e(t.currentTarget).toggleClass(s.settings.timer_paused_class),
                    r = n.closest("." + s.settings.container_class).find("." + s.settings.slides_container_class);
                n.hasClass(s.settings.timer_paused_class) ? s._stop_timer(r) : s._start_timer(r)
            }).on("touchstart.fndtn.orbit", function (e) {
                e.touches || (e = e.originalEvent);
                var t = {
                    start_page_x: e.touches[0].pageX,
                    start_page_y: e.touches[0].pageY,
                    start_time: (new Date).getTime(),
                    delta_x: 0,
                    is_scrolling: r
                };
                o.data("swipe-transition", t), e.stopPropagation()
            }).on("touchmove.fndtn.orbit", function (e) {
                e.touches || (e = e.originalEvent);
                if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
                var t = o.data("swipe-transition");
                typeof t == "undefined" && (t = {}), t.delta_x = e.touches[0].pageX - t.start_page_x, typeof t.is_scrolling == "undefined" && (t.is_scrolling = !! (t.is_scrolling || Math.abs(t.delta_x) < Math.abs(e.touches[0].pageY - t.start_page_y)));
                if (!t.is_scrolling && !t.active) {
                    e.preventDefault(), s._stop_timer(i);
                    var n = t.delta_x < 0 ? "next" : "prev";
                    t.active = !0, s.goto(i, n, function () {})
                }
            }).on("touchend.fndtn.orbit", function (e) {
                o.data("swipe-transition", {}), e.stopPropagation()
            })
        },
        _init_dimensions: function (e) {
            var t = e.parent(),
                n = e.children();
            e.css("width", n.length * 100 + "%"), n.css("width", 100 / n.length + "%"), e.height(t.height()), e.css("width", n.length * 100 + "%")
        },
        _start_timer: function (e) {
            var t = this,
                n = e.parent(),
                r = function () {
                    t._reset_timer(e, !1), t.goto(e, "next", function () {
                        t._start_timer(e)
                    })
                }, i = n.find("." + t.settings.timer_container_class),
                s = i.find("." + t.settings.timer_progress_class),
                o = s.width() / i.width(),
                u = t.settings.timer_speed - o * t.settings.timer_speed;
            s.animate({
                width: "100%"
            }, u, "linear", r).data("is-original", "beans?"), e.trigger("orbit:timer-started")
        },
        _stop_timer: function (e) {
            var t = this,
                n = e.parent(),
                r = n.find("." + t.settings.timer_container_class),
                i = r.find("." + t.settings.timer_progress_class),
                s = i.width() / r.width();
            t._rebuild_timer(n, s * 100 + "%"), e.trigger("orbit:timer-stopped"), r = n.find("." + t.settings.timer_container_class), r.addClass(t.settings.timer_paused_class)
        },
        _reset_timer: function (e, t) {
            var n = this,
                r = e.parent();
            n._rebuild_timer(r, "0%");
            if (typeof t == "boolean" && t) {
                var i = r.find("." + n.settings.timer_container_class);
                i.addClass(n.settings.timer_paused_class)
            }
        },
        _rebuild_timer: function (t, n) {
            var r = this,
                i = t.find("." + r.settings.timer_container_class),
                s = e(r._timer_html()),
                o = s.find("." + r.settings.timer_progress_class);
            if (typeof Zepto == "function") i.remove(), t.append(s), o.css("width", n);
            else if (typeof jQuery == "function") {
                var u = i.find("." + r.settings.timer_progress_class);
                u.css("width", n), u.stop()
            }
        },
        "goto": function (t, n, r) {
            var i = this,
                s = t.parent(),
                o = t.children(),
                u = t.find("." + i.settings.active_slide_class),
                a = u.index();
            if (s.hasClass(i.settings.orbit_transition_class)) return !1;
            n === "prev" ? a === 0 ? a = o.length - 1 : a-- : n === "next" ? a = (a + 1) % o.length : typeof n == "number" && (a = n % o.length), a === o.length - 1 && n === "next" ? (t.css("marginLeft", "0%"), a = 1) : a === 0 && n === "prev" && (t.css("marginLeft", "-" + (o.length - 1) * 100 + "%"), a = o.length - 2), s.addClass(i.settings.orbit_transition_class), u.removeClass(i.settings.active_slide_class), e(o[a]).addClass(i.settings.active_slide_class);
            var f = s.siblings("." + i.settings.bullets_container_class);
            f.length === 1 && (f.children().removeClass(i.settings.bullets_active_class), e(f.children()[a - 1]).addClass(i.settings.bullets_active_class));
            var l = "-" + a * 100 + "%";
            t.trigger("orbit:before-slide-change"), t.css("marginLeft") === l ? (s.removeClass(i.settings.orbit_transition_class), t.trigger("orbit:after-slide-change", [{
                slide_number: a,
                total_slides: t.children().length - 2
            }]), r()) : t.animate({
                marginLeft: l
            }, i.settings.animation_speed, "linear", function () {
                s.removeClass(i.settings.orbit_transition_class), t.trigger("orbit:after-slide-change", [{
                    slide_number: a,
                    total_slides: t.children().length - 2
                }]), r()
            })
        }
    }
}(Foundation.zj, this, this.document),
function (e, t, n, r) {
    "use strict";
    Foundation.libs.reveal = {
        name: "reveal",
        version: "4.0.4",
        locked: !1,
        settings: {
            animation: "fadeAndPop",
            animationSpeed: 250,
            closeOnBackgroundClick: !0,
            dismissModalClass: "close-reveal-modal",
            bgClass: "reveal-modal-bg",
            open: function () {},
            opened: function () {},
            close: function () {},
            closed: function () {},
            bg: e(".reveal-modal-bg"),
            css: {
                open: {
                    opacity: 0,
                    visibility: "visible",
                    display: "block"
                },
                close: {
                    opacity: 1,
                    visibility: "hidden",
                    display: "none"
                }
            }
        },
        init: function (t, n, r) {
            return this.scope = t || this.scope, Foundation.inherit(this, "data_options delay"), typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.settings.init || this.events(), this.settings.init) : this[n].call(this, r)
        },
        events: function () {
            var t = this;
            e(this.scope).on("click.fndtn.reveal", "[data-reveal-id]", function (n) {
                n.preventDefault(), t.locked || (t.locked = !0, t.open.call(t, e(this)))
            }).on("click.fndtn.reveal touchend.click.fndtn.reveal", this.close_targets(), function (n) {
                t.locked || (t.locked = !0, t.close.call(t, e(this).closest(".reveal-modal")))
            }).on("open.fndtn.reveal", ".reveal-modal", this.settings.open).on("opened.fndtn.reveal", ".reveal-modal", this.settings.opened).on("opened.fndtn.reveal", ".reveal-modal", this.open_video).on("close.fndtn.reveal", ".reveal-modal", this.settings.close).on("closed.fndtn.reveal", ".reveal-modal", this.settings.closed).on("closed.fndtn.reveal", ".reveal-modal", this.close_video)
        },
        open: function (t) {
            if (t) var n = e("#" + t.data("reveal-id"));
            else var n = e(this.scope);
            var r = e(".reveal-modal.open");
            n.data("css-top") || n.data("css-top", parseInt(n.css("top"), 10)).data("offset", this.cache_offset(n)), n.trigger("open"), r.length < 1 && this.toggle_bg(n), this.toggle_modals(r, n)
        },
        close: function (t) {
            var t = t || e(this.scope);
            this.locked = !0;
            var n = e(".reveal-modal.open").not(t);
            t.trigger("close"), this.toggle_bg(t), this.toggle_modals(n, t)
        },
        close_targets: function () {
            var e = "." + this.settings.dismissModalClass;
            return this.settings.closeOnBackgroundClick ? e + ", ." + this.settings.bgClass : e
        },
        toggle_modals: function (e, t) {
            e.length > 0 && this.hide(e, this.settings.css.close), t.filter(":visible").length > 0 ? this.hide(t, this.settings.css.close) : this.show(t, this.settings.css.open)
        },
        toggle_bg: function (t) {
            this.settings.bg.length === 0 && (this.settings.bg = e("<div />", {
                "class": this.settings.bgClass
            }).insertAfter(t)), this.settings.bg.filter(":visible").length > 0 ? this.hide(this.settings.bg) : this.show(this.settings.bg)
        },
        show: function (n, r) {
            if (r) {
                if (/pop/i.test(this.settings.animation)) {
                    r.top = e(t).scrollTop() - n.data("offset") + "px";
                    var i = {
                        top: e(t).scrollTop() + n.data("css-top") + "px",
                        opacity: 1
                    };
                    return this.delay(function () {
                        return n.css(r).animate(i, this.settings.animationSpeed, "linear", function () {
                            this.locked = !1, n.trigger("opened")
                        }.bind(this)).addClass("open")
                    }.bind(this), this.settings.animationSpeed / 2)
                }
                if (/fade/i.test(this.settings.animation)) {
                    var i = {
                        opacity: 1
                    };
                    return this.delay(function () {
                        return n.css(r).animate(i, this.settings.animationSpeed, "linear", function () {
                            this.locked = !1, n.trigger("opened")
                        }.bind(this)).addClass("open")
                    }.bind(this), this.settings.animationSpeed / 2)
                }
                return n.css(r).show().css({
                    opacity: 1
                }).addClass("open").trigger("opened")
            }
            return /fade/i.test(this.settings.animation) ? n.fadeIn(this.settings.animationSpeed / 2) : n.show()
        },
        hide: function (n, r) {
            if (r) {
                if (/pop/i.test(this.settings.animation)) {
                    var i = {
                        top: -e(t).scrollTop() - n.data("offset") + "px",
                        opacity: 0
                    };
                    return this.delay(function () {
                        return n.animate(i, this.settings.animationSpeed, "linear", function () {
                            this.locked = !1, n.css(r).trigger("closed")
                        }.bind(this)).removeClass("open")
                    }.bind(this), this.settings.animationSpeed / 2)
                }
                if (/fade/i.test(this.settings.animation)) {
                    var i = {
                        opacity: 0
                    };
                    return this.delay(function () {
                        return n.animate(i, this.settings.animationSpeed, "linear", function () {
                            this.locked = !1, n.css(r).trigger("closed")
                        }.bind(this)).removeClass("open")
                    }.bind(this), this.settings.animationSpeed / 2)
                }
                return n.hide().css(r).removeClass("open").trigger("closed")
            }
            return /fade/i.test(this.settings.animation) ? n.fadeOut(this.settings.animationSpeed / 2) : n.hide()
        },
        close_video: function (t) {
            var n = e(this).find(".flex-video"),
                r = n.find("iframe");
            r.length > 0 && (r.attr("data-src", r[0].src), r.attr("src", "about:blank"), n.fadeOut(100).hide())
        },
        open_video: function (t) {
            var n = e(this).find(".flex-video"),
                r = n.find("iframe");
            if (r.length > 0) {
                var i = r.attr("data-src");
                typeof i == "string" && (r[0].src = r.attr("data-src")), n.show().fadeIn(100)
            }
        },
        cache_offset: function (e) {
            var t = e.show().height() + parseInt(e.css("top"), 10);
            return e.hide(), t
        },
        off: function () {
            e(this.scope).off(".fndtn.reveal")
        }
    }
}(Foundation.zj, this, this.document),
function (e, t, n, r) {
    "use strict";
    Foundation.libs.section = {
        name: "section",
        version: "4.0.5",
        settings: {
            deep_linking: !1,
            one_up: !0,
            callback: function () {}
        },
        init: function (t, n, r) {
            return this.scope = t || this.scope, Foundation.inherit(this, "throttle data_options"), typeof n == "object" && e.extend(!0, this.settings, n), typeof n != "string" ? (this.set_active_from_hash(), this.settings.init || this.events(), this.settings.init) : this[n].call(this, r)
        },
        events: function () {
            var n = this;
            e(this.scope).on("click.fndtn.section", "[data-section] .title", function (t) {
                e.extend(!0, n.settings, n.data_options(e(this).closest("[data-section]"))), n.toggle_active.call(this, t, n)
            }), e(t).on("resize.fndtn.section", n.throttle(function () {
                n.resize.call(this)
            }, 30)).trigger("resize"), e("[data-section] .content").on("click.fndtn.section", function (e) {
                e.stopPropagation()
            }), e("*, html, body").on("click.fndtn.section", function (t) {
                e(t.target).closest(".title").length < 1 && e("[data-section].vertical-nav, [data-section].horizontal-nav").find("section, .section").removeClass("active").attr("style", "")
            }), this.settings.init = !0
        },
        toggle_active: function (t, n) {
            var r = e(this),
                i = r.closest("section, .section"),
                s = i.find(".content"),
                o = i.closest("[data-section]"),
                n = Foundation.libs.section;
            !n.settings.deep_linking && s.length > 0 && t.preventDefault();
            if (i.hasClass("active"))(n.small(o) || n.is_vertical(o) || n.is_horizontal(o) || n.is_accordion(o)) && i.removeClass("active").attr("style", "");
            else {
                if (n.small(o) || n.settings.one_up) r.closest("[data-section]").find("section, .section").removeClass("active").attr("style", ""), i.css("padding-top", n.outerHeight(i.find(".title")));
                e("[data-section].vertical-nav, [data-section].horizontal-nav").find("section, .section").removeClass("active").attr("style", ""), n.small(o) && i.attr("style", ""), i.addClass("active")
            }
            n.settings.callback()
        },
        resize: function () {
            var t = e("[data-section]"),
                n = Foundation.libs.section;
            t.each(function () {
                var t = e(this),
                    r = t.find("section.active, .section.active");
                if (r.length > 1) r.not(":first").removeClass("active").attr("style", "");
                else if (r.length < 1 && !n.is_vertical(t) && !n.is_horizontal(t) && !n.is_accordion(t)) {
                    var i = t.find("section, .section").first();
                    i.addClass("active"), n.small(t) ? i.attr("style", "") : i.css("padding-top", n.outerHeight(i.find(".title")))
                }
                n.small(t) ? r.attr("style", "") : r.css("padding-top", n.outerHeight(r.find(".title"))), n.position_titles(t), n.is_horizontal(t) && !n.small(t) ? n.position_content(t) : n.position_content(t, !1)
            })
        },
        is_vertical: function (e) {
            return e.hasClass("vertical-nav")
        },
        is_horizontal: function (e) {
            return e.hasClass("horizontal-nav")
        },
        is_accordion: function (e) {
            return e.hasClass("accordion")
        },
        set_active_from_hash: function () {
            var n = t.location.hash.substring(1),
                r = e("[data-section]"),
                i = this;
            r.each(function () {
                var t = e(this);
                e.extend(!0, i.settings, i.data_options(t)), n.length > 0 && i.settings.deep_linking && t.find('.content[data-slug="' + n + '"]').closest("section, .section").addClass("active")
            })
        },
        position_titles: function (t, n) {
            var r = t.find(".title"),
                i = 0,
                s = this;
            typeof n == "boolean" ? r.attr("style", "") : r.each(function () {
                e(this).css("left", i), i += s.outerWidth(e(this))
            })
        },
        position_content: function (t, n) {
            var r = t.find(".title"),
                i = t.find(".content"),
                s = this;
            typeof n == "boolean" ? (i.attr("style", ""), t.attr("style", "")) : (t.find("section, .section").each(function () {
                var t = e(this).find(".title"),
                    n = e(this).find(".content");
                n.css({
                    left: t.position().left - 1,
                    top: s.outerHeight(t) - 2
                })
            }), typeof Zepto == "function" ? t.height(this.outerHeight(r.first())) : t.height(this.outerHeight(r.first()) - 2))
        },
        small: function (t) {
            return t && this.is_accordion(t) ? !0 : e("html").hasClass("lt-ie9") ? !0 : e("html").hasClass("ie8compat") ? !0 : e(this.scope).width() < 768
        },
        off: function () {
            e(this.scope).off(".fndtn.section"), e(t).off(".fndtn.section"), this.settings.init = !1
        }
    }
}(Foundation.zj, this, this.document),
function (e, t, n, r) {
    "use strict";
    Foundation.libs.tooltips = {
        name: "tooltips",
        version: "4.0.2",
        settings: {
            selector: ".has-tip",
            additionalInheritableClasses: [],
            tooltipClass: ".tooltip",
            tipTemplate: function (e, t) {
                return '<span data-selector="' + e + '" class="' + Foundation.libs.tooltips.settings.tooltipClass.substring(1) + '">' + t + '<span class="nub"></span></span>'
            }
        },
        cache: {},
        init: function (t, n, r) {
            var i = this;
            this.scope = t || this.scope, typeof n == "object" && e.extend(!0, this.settings, n);
            if (typeof n == "string") return this[n].call(this, r);
            Modernizr.touch ? e(this.scope).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip", "[data-tooltip]", function (t) {
                t.preventDefault(), e(i.settings.tooltipClass).hide(), i.showOrCreateTip(e(this))
            }).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip", this.settings.tooltipClass, function (t) {
                t.preventDefault(), e(this).fadeOut(150)
            }) : e(this.scope).on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip", "[data-tooltip]", function (t) {
                var n = e(this);
                t.type === "mouseover" || t.type === "mouseenter" ? i.showOrCreateTip(n) : (t.type === "mouseout" || t.type === "mouseleave") && i.hide(n)
            })
        },
        showOrCreateTip: function (e) {
            var t = this.getTip(e);
            return t && t.length > 0 ? this.show(e) : this.create(e)
        },
        getTip: function (t) {
            var n = this.selector(t),
                r = null;
            return n && (r = e("span[data-selector=" + n + "]" + this.settings.tooltipClass)), typeof r == "object" ? r : !1
        },
        selector: function (e) {
            var t = e.attr("id"),
                n = e.attr("data-tooltip") || e.attr("data-selector");
            return (t && t.length < 1 || !t) && typeof n != "string" && (n = "tooltip" + Math.random().toString(36).substring(7), e.attr("data-selector", n)), t && t.length > 0 ? t : n
        },
        create: function (t) {
            var n = e(this.settings.tipTemplate(this.selector(t), e("<div>").html(t.attr("title")).html())),
                r = this.inheritable_classes(t);
            n.addClass(r).appendTo("body"), Modernizr.touch && n.append('<span class="tap-to-close">tap to close </span>'), t.removeAttr("title").attr("title", ""), this.show(t)
        },
        reposition: function (n, r, i) {
            var s, o, u, a, f, l;
            r.css("visibility", "hidden").show(), s = n.data("width"), o = r.children(".nub"), u = this.outerHeight(o), a = this.outerHeight(o), l = function (e, t, n, r, i, s) {
                return e.css({
                    top: t ? t : "auto",
                    bottom: r ? r : "auto",
                    left: i ? i : "auto",
                    right: n ? n : "auto",
                    width: s ? s : "auto"
                }).end()
            }, l(r, n.offset().top + this.outerHeight(n) + 10, "auto", "auto", n.offset().left, s), e(t).width() < 767 ? (l(r, n.offset().top + this.outerHeight(n) + 10, "auto", "auto", 12.5, e(this.scope).width()), r.addClass("tip-override"), l(o, -u, "auto", "auto", n.offset().left)) : (l(r, n.offset().top + this.outerHeight(n) + 10, "auto", "auto", n.offset().left, s), r.removeClass("tip-override"), i && i.indexOf("tip-top") > -1 ? l(r, n.offset().top - this.outerHeight(r), "auto", "auto", n.offset().left, s).removeClass("tip-override") : i && i.indexOf("tip-left") > -1 ? l(r, n.offset().top + this.outerHeight(n) / 2 - u * 2.5, "auto", "auto", n.offset().left - this.outerWidth(r) - u, s).removeClass("tip-override") : i && i.indexOf("tip-right") > -1 && l(r, n.offset().top + this.outerHeight(n) / 2 - u * 2.5, "auto", "auto", n.offset().left + this.outerWidth(n) + u, s).removeClass("tip-override")), r.css("visibility", "visible").hide()
        },
        inheritable_classes: function (t) {
            var n = ["tip-top", "tip-left", "tip-bottom", "tip-right", "noradius"].concat(this.settings.additionalInheritableClasses),
                r = t.attr("class"),
                i = r ? e.map(r.split(" "), function (t, r) {
                    if (e.inArray(t, n) !== -1) return t
                }).join(" ") : "";
            return e.trim(i)
        },
        show: function (e) {
            var t = this.getTip(e);
            this.reposition(e, t, e.attr("class")), t.fadeIn(150)
        },
        hide: function (e) {
            var t = this.getTip(e);
            t.fadeOut(150)
        },
        reload: function () {
            var t = e(this);
            return t.data("fndtn-tooltips") ? t.foundationTooltips("destroy").foundationTooltips("init") : t.foundationTooltips("init")
        },
        off: function () {
            e(this.scope).off(".fndtn.tooltip"), e(this.settings.tooltipClass).each(function (t) {
                e("[data-tooltip]").get(t).attr("title", e(this).text())
            }).remove()
        }
    }
}(Foundation.zj, this, this.document),
function (e, t, n, r) {
    "use strict";
    Foundation.libs.topbar = {
        name: "topbar",
        version: "4.0.0",
        settings: {
            index: 0,
            stickyClass: "sticky",
            custom_back_text: !0,
            back_text: "Back",
            init: !1
        },
        init: function (n, r, i) {
            var s = this;
            return this.scope = n || this.scope, typeof r == "object" && e.extend(!0, this.settings, r), typeof r != "string" ? (e("nav.top-bar").each(function () {
                s.settings.$w = e(t), s.settings.$topbar = e(this), s.settings.$section = s.settings.$topbar.find("section"), s.settings.$titlebar = s.settings.$topbar.children("ul").first(), s.settings.$topbar.data("index", 0);
                var n = e("<div class='top-bar-js-breakpoint'/>").insertAfter(s.settings.$topbar);
                s.settings.breakPoint = n.width(), n.remove(), s.assemble(), s.settings.$topbar.parent().hasClass("fixed") && e("body").css("padding-top", s.outerHeight(s.settings.$topbar))
            }), s.settings.init || this.events(), this.settings.init) : this[r].call(this, i)
        },
        events: function () {
            var n = this;
            e(this.scope).on("click.fndtn.topbar", ".top-bar .toggle-topbar", function (t) {
                var r = e(this).closest(".top-bar"),
                    i = r.find("section, .section"),
                    s = r.children("ul").first();
                n.settings.$topbar.data("height") || n.largestUL(), t.preventDefault(), n.breakpoint() && r.toggleClass("expanded").css("min-height", ""), r.hasClass("expanded") || (i.css({
                    left: "0%"
                }), i.find(">.name").css({
                    left: "100%"
                }), i.find("li.moved").removeClass("moved"), r.data("index", 0))
            }).on("click.fndtn.topbar", ".top-bar .has-dropdown>a", function (t) {
                var r = e(this).closest(".top-bar"),
                    i = r.find("section, .section"),
                    s = r.children("ul").first();
                (Modernizr.touch || n.breakpoint()) && t.preventDefault();
                if (n.breakpoint()) {
                    var o = e(this),
                        u = o.closest("li");
                    r.data("index", r.data("index") + 1), u.addClass("moved"), i.css({
                        left: -(100 * r.data("index")) + "%"
                    }), i.find(">.name").css({
                        left: 100 * r.data("index") + "%"
                    }), o.siblings("ul").height(r.data("height") + n.outerHeight(s, !0)), r.css("min-height", r.data("height") + n.outerHeight(s, !0) * 2)
                }
            }), e(t).on("resize.fndtn.topbar", function () {
                this.breakpoint() || e(".top-bar").css("min-height", "")
            }.bind(this)), e(this.scope).on("click.fndtn", ".top-bar .has-dropdown .back", function (t) {
                t.preventDefault();
                var n = e(this),
                    r = n.closest(".top-bar"),
                    i = r.find("section, .section"),
                    s = n.closest("li.moved"),
                    o = s.parent();
                r.data("index", r.data("index") - 1), i.css({
                    left: -(100 * r.data("index")) + "%"
                }), i.find(">.name").css({
                    left: 100 * r.data("index") + "%"
                }), r.data("index") === 0 && r.css("min-height", 0), setTimeout(function () {
                    s.removeClass("moved")
                }, 300)
            })
        },
        breakpoint: function () {
            return e(t).width() <= this.settings.breakPoint || e("html").hasClass("lt-ie9")
        },
        assemble: function () {
            var t = this;
            this.settings.$section.detach(), this.settings.$section.find(".has-dropdown>a").each(function () {
                var n = e(this),
                    r = n.siblings(".dropdown"),
                    i = e('<li class="title back js-generated"><h5><a href="#"></a></h5></li>');
                t.settings.custom_back_text == 1 ? i.find("h5>a").html("&laquo; " + t.settings.back_text) : i.find("h5>a").html("&laquo; " + n.html()), r.prepend(i)
            }), this.settings.$section.appendTo(this.settings.$topbar), this.sticky()
        },
        largestUL: function () {
            var t = this.settings.$topbar.find("section ul ul"),
                n = t.first(),
                r = 0,
                i = this;
            t.each(function () {
                e(this).children("li").length > n.children("li").length && (n = e(this))
            }), n.children("li").each(function () {
                r += i.outerHeight(e(this), !0)
            }), this.settings.$topbar.data("height", r)
        },
        sticky: function () {
            var n = "." + this.settings.stickyClass;
            if (e(n).length > 0) {
                var r = e(n).length ? e(n).offset().top : 0,
                    i = e(t),
                    s = this.outerHeight(e("nav.top-bar")) + 20;
                i.scroll(function () {
                    i.scrollTop() >= r ? (e(n).addClass("fixed"), e("body").css("padding-top", s)) : i.scrollTop() < r && (e(n).removeClass("fixed"), e("body").css("padding-top", "0"))
                })
            }
        },
        off: function () {
            e(this.scope).off(".fndtn.topbar"), e(t).off(".fndtn.topbar")
        }
    }
}(Foundation.zj, this, this.document);

/**
 * Expose `Foundation`
 */

module.exports = Foundation;
