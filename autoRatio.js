class autoRatio {
    constructor(config) {
        var self = this;
        this.conf = {
            target : config?.el || '.auto-ratio',
            active : 'auto-ratio__info',
            show : config?.show || true,
            set : config?.autoPadding || true
        };
        this.html = document.querySelector('html');
        this.getStyle();
        this.creator();
        this.clicked();
        window.addEventListener('resize', self.creator.bind(self), true);
    }

    clicked() {
        document.querySelectorAll(`.${this.conf.active}`).forEach((a) =>{
            a.addEventListener('click', function(){
                var self = this;
                if (navigator.clipboard)
                    navigator.clipboard.writeText(this.innerText).then(
                        function () {
                            console.log(self.innerText);
                            self.classList.add('copied');
                            setTimeout(() => {
                                self.classList.remove('copied');
                            }, 1000);
                        },
                        function () {
                            alert('Please press Ctrl/Cmd+C to copy');
                        }
                    );
                else 
                    alert('Please press Ctrl/Cmd+C to copy');
            });
        });
    }

    getStyle() {
        var link = document.createElement('link'); 
        link.rel = 'stylesheet'; 
        link.type = 'text/css';
        link.href = 'autoRatio.css'; 
        document.getElementsByTagName('head')[0].appendChild(link); 
    }

    creator() {
        const target = document.querySelectorAll(this.conf.target);
        if (target.length > 0)
            target.forEach( (t) => {
                var w, h, v, i;
                var i = t.querySelector('img');
                w = i.naturalWidth;
                h = i.naturalHeight;
                v = `calc( ${h} / ${w} * 100% )`;
                if (this.conf.set)
                    t.style.paddingTop = v;
                if (this.conf.show)
                    this.getRatio(t, v);
            });
        else 
            document.querySelectorAll('img').forEach( (x) => {
                x.parentNode.classList.add('auto-container');
                this.conf.target = '.auto-container';
                this.creator();
            });
    }

    getRatio(t, v) {
        if (!this.html.classList.contains('auto-ratio-start'))
            this.html.classList.add('auto-ratio-start');

        if (!t.querySelector(`.${this.conf.active}`)){
            var text = document.createElement('div');
            text.classList.add(this.conf.active);
            text.innerText = v;
            t.appendChild(text);
        } else {
            t.querySelector(`.${this.conf.active}`).innerText = v;
        }
        
    }
}