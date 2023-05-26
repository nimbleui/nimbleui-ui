import { isArray, isFunction, isPromise, toArray } from "@yy/utils";

import type { Rule, Rules, TriggerEventType } from "@yy/tokens";

/**
 * 校验内容是否为空
 * @param value 目标
 * @returns {boolean}
 */
export function isEmptyValue(value: unknown) {
  if (Array.isArray(value)) return !value.length;
  if (value === 0) return false;
  return !value;
}

/**
 * 获取规则错误的提示语
 * @param value 内容
 * @param rule 规则
 * @param details 其他数据
 * @returns {string}
 */
export function getRuleMessage(value: unknown, rule: Rule, details: any) {
  const { message } = rule;

  if (isFunction(message)) {
    return message(value, rule, details);
  }
  return message || "";
}

/**
 * 执行同步的校验规则
 * @param value 内容
 * @param rule 规则
 * @returns {boolean}
 */
export function runSyncRule(value: unknown, rule: Rule) {
  if (isEmptyValue(value) && rule.required) {
    return false;
  }
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return false;
  }
  return true;
}

export function runRuleValidator(value: unknown, rule: Rule, details: any) {
  return new Promise((resolve) => {
    const returnVal = rule.validator?.(value, rule, details);

    if (isPromise(returnVal)) {
      returnVal.then(resolve);
      return;
    }

    resolve(returnVal);
  });
}

/**
 * 把props中rules转成数组
 * @param rules 目标
 * @param details 其他信息
 * @returns {Array<Rule>}
 */
export function formatRules(rules: Rules | undefined, details: any) {
  if (!rules) return [];

  rules = isFunction(rules) ? rules(details) : rules;
  return isArray(rules) ? rules : [rules];
}

/**
 * 过滤满足条件rule
 * @param trigger 过滤条件
 * @param rules 目标
 * @param details 其他信息
 * @returns {boolean}
 */
export function filterRules(trigger: TriggerEventType, rules: Rules | undefined, details: any) {
  return formatRules(rules, details).filter((rule) => {
    if (rule.trigger) {
      return toArray(rule.trigger).includes(trigger);
    }
    return true;
  });
}
