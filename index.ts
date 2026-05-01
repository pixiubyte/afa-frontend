import dayjs from 'dayjs';

/**
 * 根据年月，获取月的开始和结束日期
 * @param currentTime
 * @returns
 */
export const getStartAndEndDateByMonth = (currentTime = dayjs().format('YYYY-MM')): { start: string; end: string } => {
  // 解析传入的当前时间参数
  const [year, month] = currentTime.split('-').map(Number);
  // 获取当前时间
  // const now = dayjs();
  // 生成传入时间对应的月份的第一天
  const startOfMonth = dayjs(new Date(year, month - 1, 1)); // month - 1 因为 JavaScript 中的月份是从 0 开始的
  const endOfMonth = startOfMonth.endOf('month'); // 获取这个月份的最后一天
  // 判断是否是当前月份
  // if (startOfMonth.isSame(now, 'month') && startOfMonth.isSame(now, 'year')) {
  //   // 如果是当前月份，返回本月的第一天和今天的日期
  //   return {
  //     start: startOfMonth.format('YYYY-MM-DD'), // 格式化为 YYYY-MM-DD
  //     end: now.format('YYYY-MM-DD'), // 返回当天的日期
  //   };
  // } else {
  //   // 如果不是当前月份，返回这个月份的第一天和最后一天
  //   return {
  //     start: startOfMonth.format('YYYY-MM-DD'), // 格式化为 YYYY-MM-DD
  //     end: endOfMonth.format('YYYY-MM-DD'), // 格式化为 YYYY-MM-DD
  //   };
  // }
  return {
    start: startOfMonth.format('YYYY-MM-DD'), // 格式化为 YYYY-MM-DD
    end: endOfMonth.format('YYYY-MM-DD'), // 格式化为 YYYY-MM-DD
  };
};
/**
 * 创建快照
 * @param selector
 * @param type
 * @param format
 * @returns
 */
export const createSnapshot = (selector: string, type?: string, format?: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    uni
      .createSelectorQuery()
      .select(selector)
      .node((res) => {
        const node = res.node;
        node.takeSnapshot({
          type: type || 'file',
          format: format || 'png',
          success(res) {
            resolve(res?.tempFilePath);
          },
          fail(error) {
            reject(error?.errMsg);
          },
        });
      })
      .exec();
  });
};

/**
 * 保存图片到相册
 * @param filePath
 * @returns
 */
export const saveImageToPhotosAlbum = (filePath: string) => {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success(res) {
        const auth = res.authSetting;
        if (auth.hasOwnProperty('scope.writePhotosAlbum') && !auth['scope.writePhotosAlbum']) {
          uni.openSetting();
        }
        uni.saveImageToPhotosAlbum({
          filePath: filePath,
          success(res) {
            resolve(res);
          },
          fail(error) {
            reject(error?.errMsg);
          },
        });
      },
      fail(error) {
        reject(error?.errMsg);
      },
    });
  });
};

/**
 * 解析 Markdown 内容，提取 <details> 和 <summary> 标签，并返回解析结果
 * @param {string} value - 输入的文本字符串
 * @returns {Object} - 包含解析后的内容和状态的对象
 */
export const parseContent = (value) => {
  const result = {
    hasDetails: false, // 是否包含 <details> 标签
    isOpen: false, // <details> 标签是否展开
    detailsStyle: '', // <details> 标签的样式
    summaryContent: '', // <summary> 标签的内容
    innerContent: '', // 存储 <details> 标签内部的内容，不包括 <summary>
    otherContent: '', // 存储去掉 <details> 标签后的其他内容
  };
  if (!value) return result; // 如果没有内容，返回初始状态
  // 正则表达式匹配 <details> 标签及其内容
  const detailsPattern = /<details([^>]*)>(.*?)<\/details>/s;
  const match = value.match(detailsPattern); // 查找匹配的内容

  if (match) {
    result.hasDetails = true; // 标记为包含 <details> 标签
    // 提取 <details> 标签的完整匹配、样式和内部内容
    const [fullMatch, attributes, innerContent] = match;

    // 去掉 style 属性的引号，获取样式内容
    // result.detailsStyle = style.replace(/^\s*style=["']|["']\s*$/g, '').trim() || '';
    // 去掉 style 属性的引号和 open 属性
    const styleMatch = attributes.match(/style=["']([^"']+)["']/);
    result.detailsStyle = styleMatch ? styleMatch[1].trim() : '';

    // 判断是否存在 open 属性，以设置初始折叠状态
    result.isOpen = /open/.test(attributes);

    // 正则表达式匹配 <summary> 标签的内容
    const summaryPattern = /<summary>(.*?)<\/summary>/;
    const summaryMatch = innerContent.match(summaryPattern);
    result.summaryContent = summaryMatch ? summaryMatch[1].trim() : ''; // 提取 <summary> 内容

    // 提取 <details> 内的其他内容，去掉 <summary> 标签及其内容
    const innerContentWithoutSummary = innerContent.replace(summaryPattern, '').trim();
    result.innerContent = innerContentWithoutSummary; // 存储 <details> 内部的文本内容

    // 将其他内容替换掉 <details>，保留其他内容的原始格式
    result.otherContent = value.replace(fullMatch, '').trim(); // 存储去掉 <details> 标签后的其他内容
  } else {
    result.hasDetails = false; // 标记为不包含 <details> 标签
    // 如果没有找到 <details> 标签，直接返回原始内容
    result.otherContent = value;
  }
  return result; // 返回解析结果
};

/**
 * 去除思考部分内容
 * @param value
 * @returns
 */
export const removeThinkingContent = (value) => {
  if (!value) return value; // 如果没有内容，返回初始状态
  // 正则表达式匹配 <details> 标签及其内容
  const detailsPattern = /<details([^>]*)>(.*?)<\/details>/s;
  const match = value.match(detailsPattern); // 查找匹配的内容
  if (match) {
    // 提取 <details> 标签的完整匹配、样式和内部内容
    const [fullMatch] = match;
    // 将其他内容替换掉 <details>，保留其他内容的原始格式
    return value.replace(fullMatch, '').trim(); // 存储去掉 <details> 标签后的其他内容
  } else {
    // 如果没有找到 <details> 标签，直接返回原始内容
    return value;
  }
};

/**
 * 封装uni.showModal
 * @param title
 * @param content
 * @returns
 */
export const showModal = (title: string, content: string) => {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: title || '提示',
      content: content,
      success: function (res) {
        if (res.confirm) {
          resolve(true);
        } else {
          resolve(false);
        }
      },
      fail: function (error) {
        reject(error);
      },
    });
  });
};
