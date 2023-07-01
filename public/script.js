const userInfo = async function () {
  const grab = {
    orientation: function () {
      switch (screen.orientation.type) {
        case "landscape-primary":
          return { landscape: true, upside_down: false };
          break;
        case "landscape-secondary":
          return { landscape: true, upside_down: true };
          break;
        case "portrait-primary":
          return { landscape: false, upside_down: false };
          break;
        case "portrait-secondary":
          return { landscape: false, upside_down: true };
          break;
        default:
          return {};
      }
    },
    browser: async function () {
      !(function () {
        var e = {};
        !(function () {
          "use strict";
          var t = e;
          (t.detectIncognito = void 0),
            (t.detectIncognito = function () {
              return new Promise(function (e, t) {
                var o,
                  n,
                  r = "Unknown";
                function i(t) {
                  e({ isPrivate: t, browserName: r });
                }
                function a(e) {
                  return e === eval.toString().length;
                }
                void 0 !== (n = navigator.vendor) &&
                0 === n.indexOf("Apple") &&
                a(37)
                  ? ((r = "Safari"),
                    void 0 !== navigator.maxTouchPoints
                      ? (function () {
                          var e = String(Math.random());
                          try {
                            window.indexedDB.open(e, 1).onupgradeneeded =
                              function (t) {
                                var o,
                                  n,
                                  r =
                                    null === (o = t.target) || void 0 === o
                                      ? void 0
                                      : o.result;
                                try {
                                  r
                                    .createObjectStore("test", {
                                      autoIncrement: !0,
                                    })
                                    .put(new Blob()),
                                    i(!1);
                                } catch (e) {
                                  var a = e;
                                  return (
                                    e instanceof Error &&
                                      (a =
                                        null !== (n = e.message) && void 0 !== n
                                          ? n
                                          : e),
                                    i(
                                      "string" == typeof a &&
                                        /BlobURLs are not yet supported/.test(a)
                                    )
                                  );
                                } finally {
                                  r.close(), window.indexedDB.deleteDatabase(e);
                                }
                              };
                          } catch (e) {
                            return i(!1);
                          }
                        })()
                      : (function () {
                          var e = window.openDatabase,
                            t = window.localStorage;
                          try {
                            e(null, null, null, null);
                          } catch (e) {
                            return i(!0);
                          }
                          try {
                            t.setItem("test", "1"), t.removeItem("test");
                          } catch (e) {
                            return i(!0);
                          }
                          i(!1);
                        })())
                  : (function () {
                      var e = navigator.vendor;
                      return void 0 !== e && 0 === e.indexOf("Google") && a(33);
                    })()
                  ? ((o = navigator.userAgent),
                    (r = o.match(/Chrome/)
                      ? void 0 !== navigator.brave
                        ? "Brave"
                        : o.match(/Edg/)
                        ? "Edge"
                        : o.match(/OPR/)
                        ? "Opera"
                        : "Chrome"
                      : "Chromium"),
                    void 0 !== self.Promise &&
                    void 0 !== self.Promise.allSettled
                      ? navigator.webkitTemporaryStorage.queryUsageAndQuota(
                          function (e, t) {
                            var o;
                            i(
                              Math.round(t / 1048576) <
                                2 *
                                  Math.round(
                                    (void 0 !== (o = window).performance &&
                                    void 0 !== o.performance.memory &&
                                    void 0 !==
                                      o.performance.memory.jsHeapSizeLimit
                                      ? performance.memory.jsHeapSizeLimit
                                      : 1073741824) / 1048576
                                  )
                            );
                          },
                          function (e) {
                            t(
                              new Error(
                                "icognito: failed to query storage quota: " +
                                  e.message
                              )
                            );
                          }
                        )
                      : (0, window.webkitRequestFileSystem)(
                          0,
                          1,
                          function () {
                            i(!1);
                          },
                          function () {
                            i(!0);
                          }
                        ))
                  : void 0 !== document.documentElement &&
                    void 0 !== document.documentElement.style.MozAppearance &&
                    a(37)
                  ? ((r = "Firefox"), i(void 0 === navigator.serviceWorker))
                  : void 0 !== navigator.msSaveBlob && a(39)
                  ? ((r = "Internet Explorer"), i(void 0 === window.indexedDB))
                  : t(
                      new Error("detectIncognito cannot determine the browser")
                    );
              });
            });
        })(),
          (detectIncognito = e.detectIncognito);
      })();

      const v = function () {
        var ua = navigator.userAgent;
        var tem;
        var M =
          ua.match(
            /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
          ) || [];
        if (/trident/i.test(M[1])) {
          tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
          return "IE " + (tem[1] || "");
        }
        if (M[1] === "Chrome") {
          tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
          if (tem != null)
            return tem.slice(1).join(" ").replace("OPR", "Opera");
        }
        M = M[2]
          ? [M[1], M[2]]
          : [navigator.appName, navigator.appVersion, "-?"];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return parseInt(M[1]);
      };
      const adBlock = async function () {
        let adBlockEnabled = false;
        const googleAdUrl =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        try {
          await fetch(new Request(googleAdUrl)).catch(
            (_) => (adBlockEnabled = true)
          );
        } catch (e) {
          adBlockEnabled = true;
        } finally {
          return adBlockEnabled;
        }
      };

      var result = await detectIncognito();

      result.browserVersion = v();
      result.adblock = await adBlock();
      result.languages = navigator.languages;
      result.doNotTrack = !!(
        navigator.doNotTrack || navigator.globalPrivacyControl
      );

      return result;
    },
    isMobile: function () {
      let check = false;
      (function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    },
    getOS: function () {
      var OSName = "Unknown";
      if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1)
        OSName = "Windows 10/11";
      if (window.navigator.userAgent.indexOf("Windows NT 6.3") != -1)
        OSName = "Windows 8.1";
      if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1)
        OSName = "Windows 8";
      if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1)
        OSName = "Windows 7";
      if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1)
        OSName = "Windows Vista";
      if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1)
        OSName = "Windows XP";
      if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1)
        OSName = "Windows 2000";
      if (window.navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac/iOS";
      if (window.navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX";
      if (window.navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";

      return OSName;
    },
    speed: async function () {
      var arrTimes = [];
      var i = 0;
      var timesToTest = 5;
      var tThreshold = 50;
      var testImage = "http://www.google.com/images/phd/px.gif";
      var dummyImage = new Image();
      var isConnectedFast = false;

      function testLatency(cb) {
        var tStart = new Date().getTime();
        if (i < timesToTest - 1) {
          dummyImage.src = testImage + "?t=" + tStart;
          dummyImage.onload = function () {
            var tEnd = new Date().getTime();
            var tTimeTook = tEnd - tStart;
            arrTimes[i] = tTimeTook;
            testLatency(cb);
            i++;
          };
        } else {
          /** calculate average of array items then callback */
          var sum = arrTimes.reduce(function (a, b) {
            return a + b;
          });
          var avg = sum / arrTimes.length;
          cb(avg);
        }
      }

      return new Promise((resolve, reject) => {
        testLatency(function (avg) {
          isConnectedFast = avg <= tThreshold;
          /** output */
          resolve({ time: avg.toFixed(3), fast: isConnectedFast });
        });
      });
    },
  };

  return {
    browser: await grab.browser(),
    ip: JSON.parse(`%geo%`),
    device: {
      screen: {
        height: window.screen.height,
        width: window.screen.width,
      },
      orientation: grab.orientation(),
      speed: await grab.speed(),
    },
    os: {
      mobile: grab.isMobile(),
      name: grab.getOS(),
    },
    page: {
      referrer: document.referrer,
    },
  };
};
