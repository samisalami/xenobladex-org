'use strict';

angular.module('app')
    .directive('mapGrid',['$filter', function( $filter) {
        return {
            restrict: 'EA',
            template: '<canvas style="display: block; position: absolute; z-index: 10; top:0; left: 0;" width="{{gridWidth}}" height="{{gridHeight}}"></canvas>',
            scope: {
                map: '='
            },
            link: function($scope, $element,$attrs){
                var tileDiameter = $scope.map.grid_tile_diameter;
                $scope.gridWidth = $scope.map.grid_width;
                $scope.gridHeight = $scope.map.grid_height;
                var gridOffsetX = $scope.map.grid_offset_x;
                var gridOffsetY = $scope.map.grid_offset_y;
                var gridTileMargin = $scope.map.grid_tile_margin;

                if(tileDiameter) {
                    $element.find('canvas').css({
                        top: gridOffsetY+'px',
                        left: gridOffsetX+'px'
                    });
                    var canvas = $element.find('canvas')[0];
                    var hexagonAngle = 0.523598776, // 30 degrees in radians
                        hexHeight,
                        hexRadius,
                        hexRectangleHeight,
                        hexRectangleWidth,
                        sideLength = 10,
                        boardWidth = 100,
                        boardHeight = 100;

                    hexHeight = Math.sin(hexagonAngle) * sideLength;
                    hexRadius = Math.cos(hexagonAngle) * sideLength;
                    hexRectangleHeight = sideLength + 2 * hexHeight;
                    hexRectangleWidth = 2 * hexRadius;

                    if (canvas.getContext){
                        var ctx = canvas.getContext('2d');

                        ctx.fillStyle = "#000000";
                        ctx.strokeStyle = "#0000ff";
                        ctx.lineWidth = 5;

                        drawBoard(ctx, boardWidth, boardHeight);

                        //canvas.addEventListener("mousemove", function(eventInfo) {
                        //    var x,
                        //        y,
                        //        hexX,
                        //        hexY,
                        //        screenX,
                        //        screenY,
                        //        rect;
                        //
                        //    rect = canvas.getBoundingClientRect();
                        //
                        //    x = eventInfo.clientX - rect.left;
                        //    y = eventInfo.clientY - rect.top;
                        //
                        //    hexY = Math.floor(y / (hexHeight + sideLength));
                        //    hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);
                        //
                        //    screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
                        //    screenY = hexY * (hexHeight + sideLength);
                        //
                        //    ctx.clearRect(0, 0, canvas.width, canvas.height);
                        //
                        //    drawBoard(ctx, boardWidth, boardHeight);
                        //
                        //    // Check if the mouse's coords are on the board
                        //    if(hexX >= 0 && hexX < boardWidth) {
                        //        if(hexY >= 0 && hexY < boardHeight) {
                        //            ctx.fillStyle = "#000000";
                        //            drawHexagon(ctx, screenX, screenY, true);
                        //        }
                        //    }
                        //});

                    }

                    function drawBoard(canvasContext, width, height) {
                        var i,
                            j;

                        for(i = 0; i < width; ++i) {
                            for(j = 0; j < height; ++j) {
                                drawHexagon(
                                    canvasContext,
                                    i * hexRectangleWidth + ((j % 2) * hexRadius),
                                    j * (sideLength + hexHeight),
                                    false
                                );
                            }
                        }
                    }

                    function drawHexagon(canvasContext, x, y, fill) {
                        var fill = fill || false;

                        canvasContext.beginPath();
                        canvasContext.moveTo(x + hexRadius, y);
                        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
                        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
                        canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
                        canvasContext.lineTo(x, y + sideLength + hexHeight);
                        canvasContext.lineTo(x, y + hexHeight);
                        canvasContext.closePath();

                        if(fill) {
                            canvasContext.fill();
                        } else {
                            canvasContext.stroke();
                        }
                    }
                }
            }
        }
    }]);