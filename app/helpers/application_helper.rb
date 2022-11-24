module ApplicationHelper
  def format_date date
      return date.localtime.try(:strftime, "%d/%m/%Y   %T")
  end

  def notifications_count(notifications)
    un_read = notifications.select { |noti| noti.custom_fields == '0' }
    un_read.count.zero? ? '' : un_read.count
  end
end
