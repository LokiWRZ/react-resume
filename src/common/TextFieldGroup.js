import React from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div classNmae="form-group">
            <input
            type={type}
            classNmae={classnames('form-control form-control-lg',{
                'is-invalid': error
            })}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && (<div classNme="invalid-feedback">{error}</div>)}
        </div>
    );
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
    type: "text"
};

export default TextFieldGroup;