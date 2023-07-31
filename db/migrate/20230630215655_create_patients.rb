class CreatePatients < ActiveRecord::Migration[6.1]
  def change
    create_table :patients do |t|
      t.string :name
      t.string :date_of_birth
      t.string :history
      t.string :email
      t.string :password_digest


      t.timestamps
    end
  end
end
