const util = require("./util/httpsUtil")

async function generate() {
    //https://www.bootcdn.cn/font-awesome/
    // let version = await util.getVersion("www.bootcdn.cn", "/font-awesome/");
    // console.log("Font Awesome v" + version);
    //https://unpkg.zhimg.com/font-awesome@4.7.0/css/font-awesome.min.css
    let source = await util.getCss("unpkg.zhimg.com", "/font-awesome@4.7.0/css/font-awesome.min.css")
    let namecount = 0;
    let fa = [];
    util.parse(source, it => {
        if (it.length > 1) {
            fa.push(it[0] + " " + it[1]);
        }else {
            fa.push("fa " + it[0]);
        }
        namecount++;
    });
    console.log(__dirname + "/data/")
    await util.writeFile(__dirname + "/fontawesome/", "font-awesome.v4.7.0", fa);
    console.log("parsed (" + namecount + " names)")
}

generate()
    .then(() => console.log("Successfully generated new index.js"))
    .catch(err => console.error(err));

