import React, {PropTypes} from 'react'
import cn from 'classnames'
import { Dropdown, DropdownItem } from 'appirio-tech-react-components'
import Modal from 'react-modal'

export default class CommentEditToggle extends React.Component {

  constructor(props) {
    super(props)
    this.state = {isOpen: false}
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.showDelete = this.showDelete.bind(this)
    this.cancelDelete = this.cancelDelete.bind(this)
  }

  onEdit() {
    this.setState({isOpen: false})
    this.props.onEdit()
  }

  showDelete() {
    this.setState({showDeleteConfirm: true})
  }

  cancelDelete() {
    this.setState({isOpen: false, showDeleteConfirm: false})
  }

  onDelete() {
    this.setState({isOpen: false, showDeleteConfirm: false})
    this.props.onDelete()
  }

  render() {
    const { isOpen, showDeleteConfirm } = this.state
    const editOptions = {label:this.props.forTopic ? 'Edit post' : 'Edit comment', val:'1'}
    const deleteOptions = {label:this.props.forTopic ? 'Delete post' : 'Delete comment', val:'2'}
    return (
    <div>
      <Dropdown pointerShadow className="drop-down edit-toggle-container">
        <div className={cn('dropdown-menu-header', 'edit-toggle', {'for-topic': this.props.forTopic})} >
        </div>
        <div className="dropdown-menu-list down-layer">
          <ul>
            <DropdownItem key={1} item={editOptions}
                onItemClick={this.onEdit}
                currentSelection=''
              />
            <DropdownItem key={2} item={deleteOptions}
                onItemClick={this.showDelete}
                currentSelection=''
              />
          </ul>
        </div>


        
      </Dropdown>
      <Modal
          isOpen={ showDeleteConfirm }
          className="delete-post-dialog"
          overlayClassName="delete-post-dialog-overlay"
          onRequestClose={ this.cancelDelete }
          contentLabel=""
        >
          <div className="modal-title">
            Are you sure you want to delete this post?
          </div>

          <div className="modal-body">
            This action cannot be undone.
          </div>

          <div className="button-area flex center action-area">
            <button className="tc-btn tc-btn-default tc-btn-sm action-btn btn-cancel" onClick={this.cancelDelete}>Cancel</button>
            <button className="tc-btn tc-btn-warning tc-btn-sm action-btn " onClick={this.onDelete}>Delete Post</button>
          </div>
        </Modal>

    </div>

      
    )
  }
}
CommentEditToggle.propTypes = {
  forTopic: PropTypes.bool,
  hideDelete: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
