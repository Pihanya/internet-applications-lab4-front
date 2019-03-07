import React, {Component} from "react"

class Plot extends Component {
    constructor(props) {
        super(props);

        this.onCanvasClick = this.onCanvasClick.bind(this);
        this.updateCanvas = this.updateCanvas.bind(this);

        Plot.drawPoint = Plot.drawPoint.bind(this);
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateCanvas();
    }

    render() {
        return (
            <div id="canvas-div"
                 style={{width: '300px', height: '300px'}}
                 onMouseDown={this.onCanvasClick}>
                <canvas ref={ref => this.canvas = ref}
                        id="canvas"
                        style={{width: '300px', height: '300px', backgroundColor: '#ffffff', borderRadius: '20px'}}
                        width="300" height="300"
                />
            </div>
        )
    }

    updateCanvas() {
        Plot.drawCanvas(this.canvas, this.props.r);

        let r = this.props.r === 0 ? Infinity : this.props.r;
        this.props.getVerdicts().forEach(verdict => {
            let coordX = 130 * verdict.x / r + 150;
            let coordY = 150 - 130 * verdict.y / r;

            Plot.drawPoint(this.canvas, coordX, coordY, verdict.verdict)
        });
    }

    onCanvasClick(event) {
        let r = this.props.r;

        let rect = this.canvas.getBoundingClientRect();

        let left = rect.left;
        let top = rect.top;

        let x = event.clientX - left;
        let y = event.clientY - top;

        let xValue = r * (x - 150) / 130;
        let yValue = r * (150 - y) / 130;

        this.props.addPoint(xValue, yValue, r);

        Plot.drawPoint(this.canvas, x, y, true);
    }

    static drawCanvas(canvas, r) {
        let context = canvas.getContext("2d");

        // Clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Rectangle
        context.beginPath();
        context.rect(150, 20, 65, 130);
        context.closePath();
        context.strokeStyle = "blue";
        context.fillStyle = "blue";
        context.fill();
        context.stroke();

        // Sector
        context.beginPath();
        context.moveTo(150, 150);
        context.arc(150, 150, 130, Math.PI / 2, Math.PI, false);
        context.closePath();
        context.strokeStyle = "blue";
        context.fillStyle = "blue";
        context.fill();
        context.stroke();

        // Triangle
        context.beginPath();
        context.moveTo(150, 150);
        context.lineTo(150, 215);
        context.lineTo(215, 150);
        context.lineTo(150, 150);
        context.closePath();
        context.strokeStyle = "blue";
        context.fillStyle = "blue";
        context.fill();
        context.stroke();

        // Axis rendering
        context.beginPath();
        context.font = "10px Verdana";
        context.moveTo(150, 0);
        context.lineTo(150, 300);
        context.moveTo(150, 0);
        context.lineTo(145, 15);
        context.moveTo(150, 0);
        context.lineTo(155, 15);
        context.fillText("Y", 160, 10);
        context.moveTo(0, 150);
        context.lineTo(300, 150);
        context.moveTo(300, 150);
        context.lineTo(285, 145);
        context.moveTo(300, 150);
        context.lineTo(285, 155);
        context.fillText("X", 290, 135);

        // X segments
        context.moveTo(145, 20);
        context.lineTo(155, 20);
        context.fillText(r, 160, 20);
        context.moveTo(145, 85);
        context.lineTo(155, 85);
        context.fillText((r / 2), 160, 78);
        context.moveTo(145, 215);
        context.lineTo(155, 215);
        context.fillText(-(r / 2), 160, 215);
        context.moveTo(145, 280);
        context.lineTo(155, 280);
        context.fillText(-r, 160, 280);

        // Y segments
        context.moveTo(20, 145);
        context.lineTo(20, 155);
        context.fillText(-r, 20, 170);
        context.moveTo(85, 145);
        context.lineTo(85, 155);
        context.fillText(-(r / 2), 70, 170);
        context.moveTo(215, 145);
        context.lineTo(215, 155);
        context.fillText((r / 2), 215, 170);
        context.moveTo(280, 145);
        context.lineTo(280, 155);
        context.fillText(r, 280, 170);

        context.closePath();
        context.strokeStyle = "black";
        context.fillStyle = "black";
        context.stroke();
    }

    static drawPoint(canvas, x, y, isArea) {
        let context = canvas.getContext("2d");

        context.beginPath();
        context.rect(x - 2, y - 2, 4, 4);
        context.closePath();
        if (isArea) {
            context.strokeStyle = "green";
            context.fillStyle = "green";
        } else {
            context.strokeStyle = "maroon";
            context.fillStyle = "maroon";
        }
        context.fill();
        context.stroke();
    }
}

export default Plot;