const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'projects', 'awards', "publications"]

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Yaml
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString())
                }
            })
        })
        .catch(error => console.log(error));

    // Marked
    marked.use({ mangle: false, headerIds: false })

    section_names.forEach((name, idx) => {
        if (name === 'projects') {
            // 项目数据
            const projectsData = [
                "Intelligent Circuit Breaker Data Acquisition and IoT Cloud Platform Real-Time Data Reception and Delivery, Xidian University, 2024.",
                "Image Acquisition of Underwater Robot and Real-time Transmission of Video Stream in LAN, Xidian University, 2024.",
                "Design of a Dynamic Comparator with Transconductance Enhanced Latch Stage, CQUPT, 2024.",
                "Design of Multifunction Filter, CQUPT, 2023.",
                "Battery Gauge based on Artificial Intelligence RUL Prediction Algorithm, CQUPT, 2022-2023.",
                "Design, Installation and Commissioning of Wireless Frequency Modulation Transmitter, CQUPT, 2022."
            ];

            // 获取 projects-md 元素
            const projectsMdElement = document.getElementById('projects-md');

            // 将项目数据转换为 HTML 内容
            const projectsHtml = projectsData.map((project, index) => {
                return `<div class="project-item">${project}</div>`;
            }).join('');

            // 将 HTML 内容插入到 projects-md 元素中
            projectsMdElement.innerHTML = projectsHtml;

            // 可选：添加一些样式
            const projectItems = document.querySelectorAll('.project-item');
            projectItems.forEach(item => {
                item.style.marginBottom = '1rem'; // 添加底部边距
            });
        } else {
            fetch(content_dir + name + '.md')
                .then(response => response.text())
                .then(markdown => {
                    const html = marked.parse(markdown);
                    document.getElementById(name + '-md').innerHTML = html;
                }).then(() => {
                    // MathJax
                    MathJax.typeset();
                })
                .catch(error => console.log(error));
        }
    })

});