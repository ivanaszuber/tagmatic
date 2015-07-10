/**
 * Created by ivana on 27.06.15..
 */
define(['components/home/homeModule', 'd3', 'c3'], function (module, d3, c3) {
    "use strict";

    module.registerController("homeController", homeController);

    function homeController($scope) {

        $scope.random_load_value = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        $scope.values = [];
        for (var i = 0; i < 30; ++i) {
            $scope.values.push($scope.random_load_value(40, 60));
        }

        $scope.randomData = function (size, min, max) {
            $scope.data = [];
            for (var i = 0; i < size; ++i) {
                if ($scope.data.length) {
                    var factor;
                    factor = 3;
                    var minOrganic;
                    minOrganic = $scope.data[$scope.data.length - 1] - factor;
                    var maxOrganic;
                    maxOrganic = $scope.data[$scope.data.length - 1] + factor;
                    $scope.data.push(
                        $scope.random_load_value(
                            minOrganic < min ? min : minOrganic,
                            maxOrganic > max ? max : maxOrganic
                        )
                    );
                } else {
                    $scope.data.push($scope.random_load_value(min, max));
                }
            }
            return $scope.data;
        };

        $scope.chartData1 = $scope.randomData(20, 40, 60);
        $scope.chartData2 = $scope.randomData(10, 60, 20);
        $scope.chartData3 = $scope.randomData(20, 40, 60);
        $scope.chartData4 = $scope.randomData(100, 10, 30);

        $scope.chartData1.unshift('Burndowm');
        $scope.chartData2.unshift('Sprint');
        $scope.chartData3.unshift('Capacity');

        $scope.serverLoadOptions = {
            bindto: '#server-load-chart',
            legend: {show: false},
            padding: {
                top: 6,
                right: -1,
                bottom: -8,
                left: 0
            },
            data: {
                columns: [
                    ['Server load'].concat($scope.values),
                ],
                type: 'area'
            },
            size: {
                height: 160
            },
            axis: {
                x: {
                    show: false,
                    padding: {
                        left: 0,
                        right: 0
                    }
                },
                y: {
                    show: false,
                    max: 100,
                    min: 0,
                    padding: {
                        top: 0,
                        bottom: 0
                    }
                }
            },
            grid: {
                focus: {show: false}
            },
            point: {show: false},
            tooltip: {
                format: {
                    title: function (d) {
                        return undefined;
                    }, // Disable tooltip header
                    value: function (value, ratio, id) {
                        return value + '%';
                    }
                }
            },
            transition: {duration: 50}
        };

        $scope.chartLine1 = {
            bindto: '#chart-line-1',
            data: {
                columns: [
                    $scope.chartData1
                ]
            },
            axis: {
                x: {show: false},
                y: {show: false}
            },
            color: {pattern: ['#fff']},
            legend: {hide: true},
            size: {height: 100}
        };

        $scope.chartLine2 = {
            bindto: '#chart-line-2',
            data: {
                columns: [
                    $scope.chartData2
                ]
            },
            axis: {
                x: {show: true},
                y: {show: false}
            },
            color: {pattern: ['#fff']},
            legend: {hide: false},
            size: {height: 100}
        };

        $scope.chartLine3 = {
            bindto: '#chart-line-3',
            data: {
                columns: [
                    $scope.chartData3
                ]
            },
            axis: {
                x: {show: false},
                y: {show: false}
            },
            color: {pattern: ['#fff']},
            legend: {hide: true},
            size: {height: 100}
        };


        $scope.chartArea1 = {
            bindto: '#chart-area-1',
            data: {
                columns: [
                    $scope.chartData4
                ],
                types: {'Customers': 'area'}
            },
            axis: {
                x: {show: false},
                y: {show: false}
            },
            color: {pattern: ['#EC407A']},
            legend: {hide: true},
            size: {height: 100},
            padding: {
                right: -18,
                bottom: -28,
                left: -18
            }
        };

        $scope.chartGauge1 = {
            bindto: '#chart-gauge-1',
            data: {
                columns: [
                    ['data', 80]
                ],
                types: {data: 'gauge'}
            },
            gauge: {width: 3},
            color: {pattern: ['#E91E63']},
            legend: {hide: true},
            tooltip: {show: false},
            size: {height: 80}
        };

        $scope.chartGauge2 = {
            bindto: '#chart-gauge-2',
            data: {
                columns: [
                    ['data', 30]
                ],
                types: {data: 'gauge'}
            },
            gauge: {width: 3},
            color: {pattern: ['#E91E63']},
            legend: {hide: true},
            tooltip: {show: false},
            size: {height: 80}
        };

        $scope.chartGauge3 = {
            bindto: '#chart-gauge-3',
            data: {
                columns: [
                    ['data', 40]
                ],
                types: {data: 'gauge'}
            },
            gauge: {width: 3},
            color: {pattern: ['#E91E63']},
            legend: {hide: true},
            tooltip: {show: false},
            size: {height: 80}
        };

        $scope.chartPageviews = {
            bindto: '#chart-pagesviews',
            data: {
                columns: [
                    ['Pageviews', 3, 4, 5, 10, 20, 14, 18, 12, 10, 20, 10, 14, 15, 10, 20, 14, 18, 12, 10, 20]
                ],
                types: {'Pageviews': 'area'}
            },
            axis: {
                x: {show: false},
                y: {show: false}
            },
            color: {pattern: ['#fff']},
            legend: {hide: true},
            size: {height: 100}
        };


        c3.generate($scope.serverLoadOptions);
        c3.generate($scope.chartLine1);
        c3.generate($scope.chartLine2);
        c3.generate($scope.chartLine3);
        c3.generate($scope.chartArea1);
        c3.generate($scope.chartGauge1);
        c3.generate($scope.chartGauge2);
        c3.generate($scope.chartGauge3);
        c3.generate($scope.chartPageviews);


    }
});