import "./input_range.css"
import RcSlider, { Range } from "rc-slider";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';


const RangeSlider = RcSlider.createSliderWithTooltip(RcSlider.Range);
const InputSlider = RcSlider.createSliderWithTooltip(RcSlider);


export const CustomInputRange = (props) => {
    return (
        <div className = 'range_slider_div'>
            <RangeSlider 
                min = {props.min}
                max = {props.max}
                onChange = {props.onChange}
                value = {props.value}
                allowCross = {false}
                tipProps={{visible:true, placement:"bottom"}}
                trackStyle = {[{background: "#0069bb", height: 3}]}
                handleStyle	= {[{borderColor: "#0069bb"},{borderColor: "#0069bb"}]}
            />
        </div>    
    )
}

export const CustomInputSlider = (props) => {
    return (
        <div className = 'range_slider_div'>
            <InputSlider
                min = {props.min}
                max = {props.max}
                onChange = {props.onChange}
                value = {props.value}
                tipProps={{visible:true, placement:"bottom", prefixCls:"range"}}
                tipFormatter = {(value) => `${value} month ago`}
                trackStyle = {[{background: "#0069bb", height: 3}]}
                handleStyle	= {[{borderColor: "#0069bb"}]}
            />
        </div>
    )
}

export const CustomDotInputSlider = (props) => {
    return (
        <InputSlider
        min = {props.min}
        max = {props.max}
        onChange = {props.onChange}
        onAfterChange = {props.onAfterChange}
        value = {props.value}
        tipProps={{visible:props.isTipShow, placement:"bottom"}}
        tipFormatter = {(value) => 
            `${value === 1 ? 'Worst' : 
                value === 2 ? 'Bad' : 
                value === 3 ? "Good" : 
                value === 4 ? "Great" : 
                value === 5 ? "Perfect": ""}`}
        trackStyle = {[{background: "#404040", height: 3}]}
        handleStyle	= {[{borderColor: "#0069bb", background: "#000000"}]}
        railStyle = {{background: "#404040"}}
        //dotStyle={{backgroundColor: "#404040#"}}
        //activeDotStyle = {{borderColor: "#0069bb", background: "#000000"}}
        marks = {props.marks}
        included={false}
        dots
        />
    )
}

export const CustomNormalInputSlider = (props) => {
    return (
        <RcSlider
            min = {props.min}
            max = {props.max}
            onChange = {props.onChange}
            value = {props.value}
            trackStyle = {props.trackStyle}
            handleStyle	= {props.handleStyle}
            railStyle = {props.railStyle}
        />
    )
}

