CREATE USER chengn1 FROM LOGIN chengn1; 
CREATE USER spiottdj FROM LOGIN spiottdj; 

exec sp_addrolemember 'db_owner', 'chengn1'; 
exec sp_addrolemember 'db_owner', 'spiottdj'; 

GO