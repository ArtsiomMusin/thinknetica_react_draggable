const { DOM, PropTypes } = React;

class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.canMove = false;
    this.clientX_current = 0;
    this.clientY_current = 0;

    this.startMoving = _.bind(this.startMoving, this);
    this.stopMoving = _.bind(this.stopMoving, this);
    this.handleMouseMove = _.bind(this.handleMouseMove, this);
  }
  startMoving(e) {
    this.canMove = true;
    this.clientX_current = e.clientX;
    this.clientY_current = e.clientY;
  }
  stopMoving(e) {
    this.canMove = false;
  }

  handleMouseMove(e) {
    if(!this.canMove) {return;}
    this.setState({
      left: this.state.left + (e.clientX - this.clientX_current),
      top: this.state.top + (e.clientY - this.clientY_current),
    });
    this.clientX_current = e.clientX;
    this.clientY_current = e.clientY;
  }
  render() {
    return DOM.button(
      {
        onMouseMove: this.handleMouseMove,
        onMouseDown: this.startMoving,
        onMouseUp: this.stopMoving,
        onMouseLeave: this.stopMoving,
        style: {
          position: 'fixed',
          height: 60,
          width: 70,
          left: this.state.left,
          top: this.state.top
        }
      },
      "MoveMe"
    );
  }
}

Draggable.propTypes = {
  left: PropTypes.number,
  top: PropTypes.number
};

Draggable.defaultProps = {
  left: 0,
  top: 0
};

ReactDOM.render(
  React.createElement(Draggable),
  document.getElementById("app")
);
