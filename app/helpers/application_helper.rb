module ApplicationHelper
  def format_date date
      return date.localtime.try(:strftime, "%d/%m/%Y   %T")
  end
end
