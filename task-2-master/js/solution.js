(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        var count = 0;
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                if (searchIsland(map, i, j)) {
                    count += ISLAND;
                }
            }
        };
        function searchIsland(map, i, j) {
            if ((i < 0) || (i >= map.length)) {
                return false;
            } else if ((j < 0) || (j >= map[i].length)) {
                return false;
            }
            if (map[i][j] == 1) {
                map[i][j] = WATER;
                searchIsland(map, i, (j + 1));
                searchIsland(map, i, (j - 1));
                searchIsland(map, (i + 1), j);
                searchIsland(map, (i - 1), j);
                return true;
            } else {
                return 0;
            }
        };
        return count;
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
