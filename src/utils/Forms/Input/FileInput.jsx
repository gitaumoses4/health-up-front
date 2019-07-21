import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './FileInput.scss';
import attachment from '../../../assets/images/attachment.svg';

class FileInput extends Component {
  file = React.createRef();

  state = {
    uploading: false,
    progress: 0,
    error: false,
  };

  showChooser = () => {
    const { current } = this.file;
    if (current) {
      current.click();
    }
  };

  handleUploadProgress = (e) => {
    this.setState({ progress: e.loaded / e.total });
  };

  handleChange = async (e) => {
    const { target: { files: { 0: file } } } = e;
    const {
      uploadPreset, cloudinaryUrl, onChange, name, 
    } = this.props;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const authorization = axios.defaults.headers.common.Authorization;

      delete axios.defaults.headers.common.Authorization;
      try {
        this.setState({ uploading: true, progress: 0, error: false });
        const response = await axios.post(
          cloudinaryUrl, formData, {
            onUploadProgress: this.handleUploadProgress,
          },
        );
        axios.defaults.headers.common.Authorization = authorization;
        const { data: { secure_url: secureUrl } } = response;
        onChange({ target: { value: secureUrl, name } });
        this.setState({ uploading: false, progress: 100 });
      } catch (error) {
        this.setState({ uploading: false, error: true, progress: 0 });
      }
    }
  };

  extractFileName = value => value.substring(value.lastIndexOf('/') + 1);

  render() {
    const {
      value, placeholder, onChange, name, 
    } = this.props;
    const { progress } = this.state;
    return (
      <div className="file-input">
        <div
          role="presentation"
          onBlur={() => onChange({ target: { name, value } })}
          className="file" onClick={this.showChooser}>
          <img src={attachment} alt="" />
          {
            !value ? (
              <span className="placeholder">{placeholder}</span>
            ) : (
              <span className="file-name">{this.extractFileName(value)}</span>
            )
          }
        </div>
        <progress value={progress} max={100} />
        <input
          value=""
          type="file"
          ref={this.file}
          onChange={this.handleChange} />
      </div>
    );
  }
}

FileInput.propTypes = {

};

export default FileInput;
