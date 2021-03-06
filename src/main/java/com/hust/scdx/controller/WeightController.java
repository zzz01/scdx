package com.hust.scdx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hust.scdx.model.Weight;
import com.hust.scdx.model.params.WeightQueryCondition;
import com.hust.scdx.service.WeightService;
import com.hust.scdx.util.ResultUtil;

@RequestMapping("/weight")
public class WeightController {
	@Autowired
	private WeightService weightService;

	@ResponseBody
	@RequestMapping("/selectAllWeight")
	public Object selectAllWeight(@RequestParam(value = "start", required = true) int start,
			@RequestParam(value = "limit", required = true) int limit) {
		List<Weight> weight = weightService.selectAllWeight(start, limit);
		if (weight.isEmpty()) {
			return ResultUtil.errorWithMsg("weight is empty");
		}
		return ResultUtil.success(weight);
	}

	@ResponseBody
	@RequestMapping("/selectByCondition")
	public Object selectByCondition(@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "weight", required = true) Integer weight,
			@RequestParam(value = "start", required = true) int start,
			@RequestParam(value = "limit", required = true) int limit) {
		WeightQueryCondition weightInfo = new WeightQueryCondition();
		weightInfo.setName(name);
		weightInfo.setWeight(weight);
		weightInfo.setStart(start);
		weightInfo.setLimit(limit);
		List<Weight> weights = weightService.selectByCondition(weightInfo);
		if (weights.isEmpty()) {
			return ResultUtil.errorWithMsg("未找到相关权重信息！");
		}
		return ResultUtil.success(weights);
	}

	@ResponseBody
	@RequestMapping("/selectWeightCount")
	public Object selectWeightCount(@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "weight", required = false) Integer weight) {
		long count = 0;
		if (null == name && null == weight) {
			count = weightService.selectCount();
		} else {
			WeightQueryCondition weightInfo = new WeightQueryCondition();
			weightInfo.setName(name);
			weightInfo.setWeight(weight);
			count = weightService.selectCountByCondition(weightInfo);
		}
		if (count <= 0) {
			return ResultUtil.errorWithMsg("未找到相关权重信息！");
		}
		return ResultUtil.success(count);
	}

	@ResponseBody
	@RequestMapping("/insertWeight")
	public Object insertWeight(@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "weight", required = true) Integer weight) {
		Weight weightInfo = new Weight();
		weightInfo.setName(name);
		weightInfo.setWeight(weight);
		boolean status = weightService.insertWeight(weightInfo);
		if (status == false) {
			return ResultUtil.errorWithMsg("添加失败！请检查该信息是否已存在！");
		}
		return ResultUtil.success("添加成功！");
	}

	@ResponseBody
	@RequestMapping("/deleteWeight")
	public Object deleteWeight(@RequestParam(value = "weightId", required = true) int weightId) {
		boolean status = weightService.deleteWeightById(weightId);
		if (status == false) {
			return ResultUtil.errorWithMsg("删除失败！");
		}
		return ResultUtil.success("删除成功！");
	}

	/**
	 * 新闻媒体不能更新成已有的新闻类型
	 * 
	 * @param id
	 * @param name
	 * @param weight
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/updateWeight")
	public Object updateWeight(@RequestParam(value = "id", required = true) Integer id,
			@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "weight", required = true) Integer weight) {
		Weight weightInfo = new Weight();
		weightInfo.setId(id);
		weightInfo.setName(name);
		weightInfo.setWeight(weight);
		boolean status = weightService.updateWeight(weightInfo);
		if (status == false) {
			return ResultUtil.errorWithMsg("修改失败！");
		}
		return ResultUtil.success("修改成功！");
	}
}
