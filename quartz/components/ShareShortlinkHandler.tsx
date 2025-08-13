import { QuartzComponent, QuartzComponentConstructor } from "./types"

export default (() => {
  const C: QuartzComponent = () => {
    const style = `
      .shortshare-toast{
        position:fixed; right:16px; top:16px; z-index:9999;
        background:rgba(28,28,30,.92); color:#fff;
        padding:10px 12px; border-radius:12px;
        box-shadow:0 10px 30px rgba(0,0,0,.25);
        font-size:14px; line-height:1.3;
        opacity:0; transform:translateY(8px);
        transition:opacity .18s ease, transform .18s ease;
        pointer-events:none;
      }
      .shortshare-toast.show{ opacity:1; transform:translateY(0); }
      @media (prefers-color-scheme: light){
        .shortshare-toast{ background:rgba(0,0,0,.85); color:#fff; }
      @media (max-width: 1200px){
        a[href="#share-this-page"]{ display: none; }
        }
      }
    `

    const code = `
      (function(){
        // 创建/复用 toast
        function ensureToast(){
          var t = document.querySelector('.shortshare-toast');
          if(!t){
            t = document.createElement('div');
            t.className = 'shortshare-toast';
            document.body.appendChild(t);
          }
          return t;
        }
        function showToast(msg){
          var t = ensureToast();
          t.textContent = msg;
          t.classList.add('show');
          clearTimeout(t._timer);
          t._timer = setTimeout(function(){ t.classList.remove('show'); }, 2200);
        }
        async function copyToClipboard(txt){
          try{ await navigator.clipboard.writeText(txt); }catch(_){}
          showToast('已复制短链');
        }

        if(window.__shortshare_added) return; window.__shortshare_added = true;

        document.addEventListener('click', async function(e){
          var target = e.target;
          var a = target && target.closest ? target.closest('a[href="#share-this-page"]') : null;
          if(!a) return;
          e.preventDefault();

          var u = new URL(location.href)
          u.hash = ""                                   // 去掉 #fragment
          // 可选：顺手清一些跟踪参数，避免同页多码
          ;["utm_source","utm_medium","utm_campaign","utm_term","utm_content","ref","source"].forEach(k => u.searchParams.delete(k))

          var longUrl  = u.toString()
          var cacheKey = "shortlink:" + longUrl

          try{
            var res = await fetch('https://go.dacnote.cn/api/shorten.php', {
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify({ url: longUrl })
            });
            var data = await res.json();
            if(!res.ok || !data || !data.shorturl) throw new Error((data && (data.message||data.error)) || 'fail');
            var shortUrl = data.shorturl;
            try{ localStorage.setItem(cacheKey, shortUrl); }catch(_){}
            copyToClipboard(shortUrl);
          }catch(err){
            var cached = null; try{ cached = localStorage.getItem(cacheKey); }catch(_){}
            if(cached) copyToClipboard(cached);
            else { showToast('生成短链失败'); console.error(err); }
          }
        }, false);
      })();
    `
    return <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <script dangerouslySetInnerHTML={{ __html: code }} />
    </>
  }
  return C
}) satisfies QuartzComponentConstructor
