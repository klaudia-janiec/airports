airports_file_path = Rails.root.join('config', 'airports.csv').to_s

sql = <<-SQL
  COPY airports FROM '#{airports_file_path}' WITH (FORMAT csv);
SQL

ActiveRecord::Base.connection.execute(sql)
