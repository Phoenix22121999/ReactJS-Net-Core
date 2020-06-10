import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import _ from "lodash";
import { connect } from "react-redux";
import * as Action from "../Actions/index";

function Search(props) {
    // constructor(props) {
    //     super(props);
    //     state = {
    //         inputValue: "",
    //     };
    //     handleChange = handleChange.bind(this);
    //     handleSearch = handleSearch.bind(this);
    //     handleClear = handleClear.bind(this);
    // }
    const [inputValue, setInputValue] = useState("");

    function handleChange(e) {
        setInputValue(e.target.value);
        debounceSearch(e.target.value);
    }

    const debounceSearch = _.debounce((value) => {
        props.search(value);
    }, 500);

    // function handleSearch() {
    //     // console.log(state.inputValue);
    //     props.search(inputValue);
    // }

    function handleClear() {
        setInputValue("");
        props.search("");
    }

    return (
        <Col sm={3} xs={3} md={3} lg={3}>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search for..."
                    type="text"
                    aria-describedby="basic-addon1"
                    value={inputValue}
                    onChange={handleChange}
                />
                <InputGroup.Append>
                    <ButtonGroup>
                        {/* <Button variant="secondary" onClick={handleSearch}>
                            Go!
                        </Button> */}
                        <Button variant="secondary" onClick={handleClear}>
                            Clear
                        </Button>
                    </ButtonGroup>
                </InputGroup.Append>
            </InputGroup>
        </Col>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        search: (search) => {
            dispatch(Action.search(search));
        },
    };
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
