// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="Index.html">들어가며</a></li><li class="chapter-item expanded affix "><li class="part-title">Unity</li><li class="chapter-item expanded "><a href="unity/assetbundle.html">AssetBundle</a></li><li class="chapter-item expanded "><a href="unity/accelerator.html">Accelerator</a></li><li class="chapter-item expanded "><a href="unity/attribute.html">Attribute</a></li><li class="chapter-item expanded "><a href="unity/path.html">Path</a></li><li class="chapter-item expanded "><a href="unity/editor_window.html">EditorWindow</a></li><li class="chapter-item expanded "><a href="unity/SettingsProvider.html">SettingProvider</a></li><li class="chapter-item expanded "><a href="unity/ugui.html">ugui</a></li><li class="chapter-item expanded "><a href="unity/unitywebrequest.html">UnityWebRequest</a></li><li class="chapter-item expanded affix "><li class="part-title">ThirdParty</li><li class="chapter-item expanded "><a href="thirdparty/unitask.html">UniTask</a></li><li class="chapter-item expanded affix "><li class="part-title">Package</li><li class="chapter-item expanded "><a href="package/package.html">package</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="package/package-unity.html">package-unity</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="package/package-unity/scriptablebuildpipeline-sbp.html">com.unity.scriptablebuildpipeline</a></li><li class="chapter-item expanded "><a href="package/package-unity/logging.html">com.unity.logging</a></li></ol></li><li class="chapter-item expanded "><a href="package/package-opensource.html">package-opensource</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">DOT</li><li class="chapter-item expanded "><a href="dots/dots-ecs.html">dot</a></li><li class="chapter-item expanded affix "><li class="part-title">Snippet</li><li class="chapter-item expanded "><a href="snippet/snippet.html">snippet</a></li><li class="chapter-item expanded affix "><li class="part-title">에셋</li><li class="chapter-item expanded "><a href="asset/asset-paid.html">에셋-유료</a></li><li class="chapter-item expanded "><a href="asset/asset-free.html">에셋-무료</a></li><li class="chapter-item expanded "><a href="asset/audio/audio.html">Audio</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="asset/audio/fmod.html">FMOD</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Etc</li><li class="chapter-item expanded "><a href="etc/compile-warning.html">compile-warning</a></li><li class="chapter-item expanded "><a href="etc/csc.html">csc.rsp</a></li><li class="chapter-item expanded "><a href="etc/WindowsSetting.html">Windows Settings</a></li><li class="chapter-item expanded affix "><li class="part-title">디버깅</li><li class="chapter-item expanded "><a href="debugging/adb.html">ADB</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
