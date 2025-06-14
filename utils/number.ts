export default {
  format(input: any, fix: number) {
    return input
      ? Number(Number(input).toFixed(fix ?? 0)).toLocaleString()
      : null;
  },
  increaseNumber(num: string, totalLength: number) {
    return String(num).padStart(totalLength, "0");
  },
  formatCurrency(amount: any, locale = "vi-VN", currency = "VND") {
    const numericAmount = Number(amount);

    if (isNaN(numericAmount)) {
      throw "N/A";
    }

    return numericAmount.toLocaleString(locale, {
      style: "currency",
      currency: currency,
    });
  },
  formatNumberWithDots(num: any) {
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
  kelvinToCelsius(kelvin: number) {
    const celsius = (kelvin - 273.15).toFixed(0);
    return celsius.endsWith(".0") ? celsius.slice(0, -2) : celsius;
  },
  formatDateWithDay(timestamp: any, formatType?: number) {
    const date = new Date(timestamp * 1000);

    // Lấy thứ trong tuần
    const shortDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const fullDays = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];

    // Mặc định hiển thị "T2 30/03"
    let dayOfWeek = shortDays[date.getDay()];
    let formattedDate = date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });

    // Nếu formatType === 1, đổi sang dạng đầy đủ "Chủ nhật, Thứ 2..."
    if (formatType === 1 || formatType === 4 || formatType === 8) {
      dayOfWeek = fullDays[date.getDay()];
      return dayOfWeek;
    }

    // Nếu formatType === 2, đổi sang dạng "Chủ nhật<br /> Ngày 30/03/2025"
    if (formatType === 2) {
      formattedDate = date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return `${fullDays[date.getDay()]}<br /> Ngày ${formattedDate}`;
    }

    if (formatType === 3 || formatType === 4) {
      formattedDate = date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return `${fullDays[date.getDay()]}, Ngày ${formattedDate}`;
    }
    return `${dayOfWeek} ${formattedDate}`;
  },
};
