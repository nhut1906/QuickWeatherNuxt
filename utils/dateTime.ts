export default {
  getCurrentDate() {
    return new Date().toISOString().slice(0, 10);
  },
  timeStampToString(timeStamp: any) {
    return timeStamp
      ? this.formatDateTime(new Date(timeStamp * 1000).toDateString())
      : "";
  },
  //convert date data form string
  formatDate(input: string) {
    return input ? new Date(input).toISOString().slice(0, 10) : null;
  },
  formatDateTime(input: string) {
    return input
      ? new Date(input).toISOString().replace(/T/, " ").replace(/\..+/, "")
      : null;
  },
  formatDatenew(input: string) {
    const date = new Date(input);
    if (!isNaN(date.getTime())) {
      const m = Number(date.getMonth() + 1);
      const d = Number(date.getDate());
      if (m < 10) {
        if (d < 10) {
          return date.getFullYear() + "/" + "0" + m + "/" + "0" + d;
        } else {
          return date.getFullYear() + "/" + "0" + m + "/" + d;
        }
      }
      {
        if (d < 10) {
          return date.getFullYear() + "/" + m + "/" + "0" + d;
        } else {
          return date.getFullYear() + "/" + m + "/" + d;
        }
      }
    }
  },
  formatDateTimeNew(input: string) {
    if (!input) {
      return null;
    }

    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
  getDayMonthYear(input: string) {
    if (!input) {
      return null;
    }
    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return { day, month, year };
  },
  formatDateTimeGrenCode(input: string) {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
  },
  formatDateNew(input: string) {
    if (!input) {
      return null;
    }

    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  },
  encodeDateToTimestamp(date: any) {
    if (!(date instanceof Date)) {
      throw new Error("Invalid input. Please provide a valid Date object.");
    }

    return Math.floor(date.getTime() / 1000);
  },
  decodeTimestampToDate(timestamp: any) {
    if (typeof timestamp !== "number" || isNaN(timestamp)) {
      throw new Error(
        "Invalid input. Please provide a valid timestamp as a number."
      );
    }
    return new Date(timestamp * 1000);
  },

  formatDayMonthYear(input: string) {
    if (!input) {
      return null;
    }

    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  },
  formatTimeNew(input: string) {
    if (!input) {
      return null;
    }

    const date = new Date(input);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  },
  formatDayMonthYearExport(input: string) {
    if (!input) {
      return null;
    }

    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}${month}${year}`;
  },
  formatDateVN(input: string) {
    if (!input) {
      return null;
    }

    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  },

  convertTo12HourFormat(d: any): string {
    const date = new Date(d);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;

    const today = new Date();
    const isToday =
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear();

    if (!isToday) {
      const formattedDate = this.formatDateVN(d);
      return `${formattedDate} ${hours}:${minutesStr} ${ampm}`;
    }

    return `${hours}:${minutesStr} ${ampm}`;
  },
  formatDateToDDMMYYYY(date: any) {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  },
  formatTimestampTo12Hour(timestamp: any) {
    const date = new Date(timestamp * 1000); // Chuyển timestamp (giây) thành milliseconds
    let hours = date.getHours(); // Lấy giờ (0-23)
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Lấy phút, đảm bảo 2 chữ số
    const ampm = hours >= 12 ? "PM" : "AM"; // Xác định AM/PM

    hours = hours % 12 || 12; // Chuyển sang định dạng 12 giờ

    return `${hours}:${minutes} ${ampm}`;
  },
  formatTimestampToDay(timestamp: number) {
    let date = new Date(timestamp * 1000);
    let days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    return `${days[date.getDay()]} ${date.getDate()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  }
};
