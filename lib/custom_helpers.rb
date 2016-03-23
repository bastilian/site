# Custom tempalte Helpers
module CustomHelpers
  def group_events_by(events, part)
    events = events.group_by do |event|
      Date.new(*event.date.split('-').map(&:to_i)).send(part)
    end

    events.sort_by { |year| year }
  end

  def find_article(url)
    blog.articles.select { |e| e.url.chomp('/') == url }[0]
  end
end
