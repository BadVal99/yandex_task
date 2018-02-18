(function (root) {
    var map = root.SHRI_ISLANDS.MAP;
    document.querySelector('.outer').appendChild(
        root.SHRI_ISLANDS.render(map, function count() {
            return root.SHRI_ISLANDS.solution(map);
        })
    );
})(this);
