<template>
    <div class="container content">
        <article class="my-2" id="what">
            <h2>
                edinfoとは？
            </h2>
            <p>
                「edinfo」は、日本全国の緊急車両出動情報を統一されたフォーマットで提供することを目的とした「<a href="https://github.com/oageo/emergency-dispatch">emergency-dispatch</a>」のデータを、人間にとって分かりやすく表示するWebサイトです。
            </p>
            <p>
                emergency-dispatchにおいて提供されるデータは<span class="is-underlined">あくまで非公式</span>なものであるため、edinfoで提供される情報も非公式なものとなります。
            </p>
        </article>
        <article class="my-2" id="whomade">
            <h2>
                誰が作っているの？
            </h2>
            <p>
                emergency-dispatchの作者と同じoageo（Osumi Akari）が制作しています。
            </p>
        </article>
        <article class="my-2" id="datawherefrom">
            <h2>
                データはどこから得ているの？
            </h2>
            <p>
                データは全てemergency-dispatchから取得しています。emergency-dispatchにおいては各消防本部等の公開情報から情報を得ています。
            </p>
        </article>
        <article class="my-2" id="seefire">
            <h2>
                掲載するべき事象を見かけたのに掲載されていない
            </h2>
            <p>
                初めにemergency-dispatchが対応しているかどうかを、<a href="https://github.com/oageo/emergency-dispatch/blob/develop/README.md#%E5%AF%BE%E5%BF%9C%E5%B8%82%E5%8C%BA%E7%94%BA%E6%9D%91">emergency-dispatchのREADME</a>において確認してください。対応市区町村内にいらっしゃり、掲載するべき事象を見かけた際はまず119番通報などを行うなどし、消防本部等が事象を認知できるようにしてください。またemergency-dispatchは常に最新情報を得るのではなく、その実行時における最新情報を取得するようになっています。そのためしばらく待ってから更新してください。
            </p>
            <p>
                他にも消防本部等の判断によって情報が公開されない場合や、emergency-dispatchの不備によって取得が上手くいかない場合があります。いずれにしろ、大半の消防本部等において出動情報の更新は最重要な業務ではない（当該市区町村における住民の生命と財産を守ることが基本的に最重要である）ため、情報が遅れたり欠損する場合がままありますため、このような非公式な情報に頼るのではなく、ある程度は自らで確認されることをおすすめします。
            </p>
        </article>
        <article class="my-2" id="scrape">
            <h2>
                このWebサイトの情報を活用したい
            </h2>
            <p>
                このWebサイトはemergency-dispatchによって提供されるJSONファイルを、人間が理解しやすい形に再加工しているだけとも言えます。つきましては、このWebサイトのソースコードを参考にした上で、emergency-dispatchのJSONファイルを直接活用された方が利便性が高いかと思われます。
            </p>
        </article>
    </div>
</template>